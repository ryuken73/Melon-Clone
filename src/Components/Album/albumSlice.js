import { createSlice } from "@reduxjs/toolkit";
import {baseUrl, apiMap, responseToObject} from '../../config/apis';

const initialState = {
    fetched:{
        'all': [],
        'kpop': [],
        'pop': [],
        'classic': [],
        'etc': []
    }
}

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        addFetchedAlbums: (state, action) => {
            console.log(action)
            const {type, payload} = action;
            const {category, albums} = payload
            state.fetched[category] = [...state.fetched[category], ...albums];
        },
        replaceAlbums: (state, action) => {
            console.log(action)
            const {type, payload} = action;
            const {category, albums} = payload
            state.fetched[category] = albums;
        },
    }
})

const DEFAULT_FETCH_QUERY = {
    // 'page_num': 1,
    'page_sizes': 20,
    'scn': 'album',
    'query': `status='Y'`,
    'orderby': 'order by open_dt desc',
    'bool': true
}

const SERVER_NAME = 'musicbank';
const API_NAME = 'searchAlbum';
const api = apiMap[API_NAME];
const {uri, headers:responseHeaders} = api;

const DEFAULT_FETCH_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

export const fetchAlbums = ({pathname='all', query, replace=false}) => async (dispatch, getState) => {
    const searchParam = new URLSearchParams();
    const mergedQuery = {...DEFAULT_FETCH_QUERY, ...query};
    const state = getState();
    const albumsInState = state.album.fetched[pathname];
    console.log(albumsInState, replace)
    mergedQuery.page_num = replace ? 1 : Math.ceil(albumsInState.length/mergedQuery.page_sizes) + 1;
    Object.keys(mergedQuery).forEach(queryKey => {
        searchParam.append(queryKey, mergedQuery[queryKey])
    })
    const mergedOptions = {...DEFAULT_FETCH_OPTIONS, body: searchParam}
    const newAlbums = await fetch(uri, mergedOptions);
    const response = await newAlbums.json();
    const {fdata} = response;
    const albums = responseToObject(fdata, responseHeaders);
    const imagePathAttachedAlbums = albums.map(album => {
        return {...album, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${album.label_no}.JPG`}
    })
    if(replace){
        dispatch(replaceAlbums({category:pathname, albums:imagePathAttachedAlbums}));
    } else {
        dispatch(addFetchedAlbums({category:pathname, albums:imagePathAttachedAlbums}));
    }
}

export const {addFetchedAlbums, replaceAlbums} = albumSlice.actions;
export default albumSlice.reducer;