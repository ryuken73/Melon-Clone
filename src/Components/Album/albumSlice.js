import { createSlice } from "@reduxjs/toolkit";
import {baseUrl, apiMap, responseToObject} from '../../config/apis';

const initialState = {
    fetched:{
        'all': [],
        'kpop': [],
        'pop': [],
        'classic': [],
        'etc': []
    },
    songList: {}
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

const SERVER_NAME = 'musicbank';

const DEFAULT_FETCH_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

export const fetchAlbums = ({pathname='all', query, replace=false}) => async (dispatch, getState) => {
    const API_NAME = 'searchAlbum';
    const api = apiMap[API_NAME];
    const {uri, headers:responseHeaders} = api;
    const DEFAULT_FETCH_QUERY = {
        'page_sizes': 100,
        'scn': 'album',
        'query': `status='Y'`,
        'orderby': 'order by open_dt desc',
        'bool': true
    }

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

export const doListAlbum = ({receiptNo}) => async (dispatch, getState) => {
    const API_NAME = 'doListAlbum';
    const api = apiMap[API_NAME];
    const {uri, headers:responseHeaders} = api;
    const searchParam = new URLSearchParams();
    searchParam.append('receipt_no', receiptNo);
    const response = await fetch(uri, {body: searchParam});
    const jsonfied = await response.json();
    const {songList} = jsonfied;
    const songListObject = responseToObject(songList, responseHeaders);
    console.log(songListObject);
}

export const {addFetchedAlbums, replaceAlbums} = albumSlice.actions;
export default albumSlice.reducer;