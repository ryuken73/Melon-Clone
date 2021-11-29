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

const addMoreAttr = (list_song, label_no) => {
    return list_song.map(song => {
        const {attach_path, attach_name} = song;
        const label = label_no.substr(0,3);
        return {
            ...song, 
            id: `${song.receipt_no}:${song.reg_no}`, 
            src: `${CONSTANTS.BASE_STREAM_URL}${attach_path}/${label}/${label_no}/${attach_name}.mp3/playlist.m3u8`,
            albumImageSrc: `${BASE_API_URL}/Video/small_image/${label_no}.JPG`,
            checkedSongList:false, 
            checkedPlaylist:false, 
            currentPlaying:false}
    }) 
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
        setSongCheckedInSongList: (state, action) => {
            const {type, payload} = action;
            const {receipt_no, rownum, checked} = payload;
            const song = state.songListInAlbum[receipt_no].find(song => song.rownum === rownum);
            song.checkedSongList = checked;

        },
        toggleAllSongsCheckedInPlaylist: (state, action) => {
            const {type, payload} = action;
            const {receipt_no} = payload;
            const songList = state.songListInAlbum[receipt_no];
            if(songList.every(song => song.checkedPlaylist)){
                songList.forEach(song => song.checkedPlaylist = false);
                return
            }
            songList.forEach(song => song.checkedPlaylist = true);
        },
        toggleSongCheckedInSongList: (state, action) => {
            const {type, payload} = action;
            const {receipt_no, rownum} = payload;
            const song = state.songListInAlbum[receipt_no].find(song => song.rownum === rownum);
            song.checkedSongList = !song.checkedSongList;
        },
        toggleAllSongsCheckedInSongList: (state, action) => {
            const {type, payload} = action;
            const {receipt_no} = payload;
            const songList = state.songListInAlbum[receipt_no];
            if(songList.every(song => song.checkedSongList)){
                songList.forEach(song => song.checkedSongList = false);
                return
            }
            songList.forEach(song => song.checkedSongList = true);
        }
    }
})

const SERVER_NAME = 'musicbank';
const PAGE_SIZE = CONSTANTS.ALBUM_PAGE_SIZE;
const {BASE_API_URL} = CONSTANTS;
const DEFAULT_FETCH_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
}

export const fetchAlbums = ({category='all', query, replace=false}) => async (dispatch, getState) => {
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
    const albumsInState = state.album.fetched[category];
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
        // return {...album, eval_imagePath: `${baseUrl[SERVER_NAME]}/Video/small_image/${album.label_no}.JPG`}
        const albumImageSrc = `${BASE_API_URL}/Video/small_image/${album.label_no}.JPG`;
        return {...album, eval_imagePath: albumImageSrc}
    })
    if(replace){
        dispatch(replaceAlbums({category, albums:imagePathAttachedAlbums}));
    } else {
        dispatch(pushFetchedAlbums({category, albums:imagePathAttachedAlbums}));
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
    const withMoreAttrListSong = addMoreAttr(list_song, info.label_no);
    dispatch(addObjectToState({stateKey:'songListInAlbum', key: receipt_no, value: withMoreAttrListSong}))
    dispatch(addObjectToState({stateKey:'albumInfoList', key:receipt_no, value: imagePathAttachedAlbum}))
}

export const addSongsInAlbumToCurrentPlaylist = ({receipt_no, rownum, allChecked=false}) => async (dispatch, getState) => {
    console.log('addSonglist:',receipt_no, rownum, allChecked)
    const state = getState();
    const listSong = state.album.songListInAlbum[receipt_no];
    if(rownum !== undefined){
        const targetSong = listSong.find(song => song.rownum === rownum);
        if(targetSong !== undefined){
            dispatch(pushObjectToState({stateKey:'currentPlaylist', value: targetSong}));
            dispatch(showMessageBoxForDuration(`1곡을 재생목록에 추가했습니다.`));
            dispatch(setSongCheckedInSongList({receipt_no, rownum, checked: false}))
        }
        return  
    }
    if(allChecked){
        const songsChecked = listSong.filter(song => song.checkedSongList === true);
        const songsReversed = [...songsChecked].reverse();
        songsReversed.forEach(song => dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song})));
        dispatch(showMessageBoxForDuration(`${songsChecked.length}곡을 재생목록에 추가했습니다.`));
        songsChecked.forEach(song => dispatch(setSongCheckedInSongList({receipt_no, rownum: song.rownum, checkedSongList: false})))
        return
    }
    if(listSong !== undefined){
        console.log('&&&:', listSong)
        const songReversed = [...listSong].reverse();
        songReversed.forEach(song => dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song})));
        dispatch(showMessageBoxForDuration(`${listSong.length}곡을 재생목록에 추가했습니다.`));
        listSong.forEach(song => dispatch(setSongCheckedInSongList({receipt_no, rownum: song.rownum, checked: false})))
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
    const withMoreAttrListSong = addMoreAttr(list_song, info.label_no);
    const songReversed = [...withMoreAttrListSong].reverse();
    dispatch(addObjectToState({stateKey:'songListInAlbum', key: receipt_no, value: withMoreAttrListSong}))
    songReversed.forEach(song => dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song})));
    dispatch(setMessageBoxText(`${withMoreAttrListSong.length}곡을 재생목록에 추가했습니다.`));
}

export const {
    pushFetchedAlbums, 
    replaceAlbums, 
    addObjectToState, 
    setSongCheckedInSongList,
    toggleSongCheckedInSongList,
    toggleAllSongsCheckedInPlaylist,
    toggleAllSongsCheckedInSongList
} = albumSlice.actions;

export default albumSlice.reducer;