import {createSlice} from "@reduxjs/toolkit";
import {baseUrl, apiMap, responseToObject} from 'config/apis';
import CONSTANTS from 'config/constants'

const initialState = {
    currentPlaylist: [],
    userPlayList: []
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        pushObjectToState: (state, action) => {
            console.log(action);
            const {type, payload} = action;
            const {stateKey, value} = payload
            state[stateKey].push(value);  
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

export const {pushObjectToState} = playlistSlice.actions;
export default playlistSlice.reducer;