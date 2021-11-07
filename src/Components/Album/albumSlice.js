import { createSlice } from "@reduxjs/toolkit";
import {baseUrl, apiMap, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants'
import {pushObjectToState} from 'Components/PlayList/playlistSlice';
import {showMessageBoxForDuration, setMessageBoxText} from 'appSlice';

const initialState = {
    fetched:{
        'all': [],
        'kpop': [],
        'pop': [],
        'classic': [],
        'etc': []
    },
    songListInAlbum: {},
    albumInfoList: {}
}

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        pushFetchedAlbums: (state, action) => {
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
        addObjectToState: (state, action) => {
            console.log(action);
            const {type, payload} = action;
            const {stateKey, key, value} = payload
            state[stateKey][key] = value;  
        },
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
        dispatch(pushFetchedAlbums({category:pathname, albums:imagePathAttachedAlbums}));
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
    const withMoreAttrListSong = list_song.map(song =>{
        return {...song, id: `${song.receipt_no}:${song.reg_no}`, checked:false, currentPlaying:false}
    })
    dispatch(addObjectToState({stateKey:'songListInAlbum', key: receipt_no, value: withMoreAttrListSong}))
    dispatch(addObjectToState({stateKey:'albumInfoList', key:receipt_no, value: imagePathAttachedAlbum}))
}

export const addSongsInAlbumToCurrentPlaylist = ({receipt_no}) => async (dispatch, getState) => {
    const state = getState();
    const listSong = state.album.songListInAlbum[receipt_no];
    if(listSong !== undefined){
        listSong.map(song => dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song})));
        return
    }
    const API_NAME = 'doListAlbum';
    const api = apiMap[API_NAME];
    const {uri, headers: responseHeaders} = api;
    const searchParam = new URLSearchParams();
    searchParam.append('receipt_no', receipt_no);
    const response = await fetch(uri, {...DEFAULT_FETCH_OPTIONS, body: searchParam});
    const jsonfied = await response.json();
    console.log('###', jsonfied)
    const {info, list_song} = jsonfied;
    const withMoreAttrListSong = list_song.map(song =>{
        return {...song, id: `${song.receipt_no}:${song.reg_no}`, checked:false, currentPlaying:false}
    })
    withMoreAttrListSong.forEach(song => dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song})));
    dispatch(setMessageBoxText(`${withMoreAttrListSong.length}곡을 재생목록에 추가했습니다.`));
    dispatch(showMessageBoxForDuration());
}

export const {pushFetchedAlbums, replaceAlbums, addObjectToState} = albumSlice.actions;
export default albumSlice.reducer;