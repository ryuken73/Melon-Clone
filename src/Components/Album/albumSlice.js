import { createSlice } from "@reduxjs/toolkit";
import {baseUrl, apiMap, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants'

const initialState = {
    fetched:{
        'all': [],
        'kpop': [],
        'pop': [],
        'classic': [],
        'etc': []
    },
    songList: {},
    albumInfo: {}
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
        addSongList: (state, action) => {
            console.log(action);
            const {type, payload} = action;
            const {receipt_no, list_song} = payload
            state.songList[receipt_no] = list_song;  
        },
        addAlbumInfo: (state, action) => {
            console.log(action);
            const {type, payload} = action;
            const {receipt_no, album_info} = payload
            state.albumInfo[receipt_no] = album_info;  
        }
    }
})

const SERVER_NAME = 'musicbank';
const PAGE_SIZE = CONSTANTS.ALBUM_PAGE_SIZE;
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
        'page_sizes': PAGE_SIZE,
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

export const doListAlbum = ({receipt_no}) => async (dispatch, getState) => {
    const API_NAME = 'doListAlbum';
    const api = apiMap[API_NAME];
    const {uri, headers: responseHeaders} = api;
    const searchParam = new URLSearchParams();
    searchParam.append('receipt_no', receipt_no);
    const response = await fetch(uri, {...DEFAULT_FETCH_OPTIONS, body: searchParam});
    const jsonfied = await response.json();
    console.log('###', jsonfied)
    const {info, list_song} = jsonfied;
    const imagePathAttachedAlbum = {...info, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${info.label_no}.JPG`}
    dispatch(addSongList({receipt_no, list_song}))
    dispatch(addAlbumInfo({receipt_no, album_info: imagePathAttachedAlbum}))
}

export const {addFetchedAlbums, replaceAlbums, addSongList, addAlbumInfo} = albumSlice.actions;
export default albumSlice.reducer;