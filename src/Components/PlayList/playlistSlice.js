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
            const {stateKey, value, reverse=true} = payload
            if(reverse){
                state[stateKey].unshift(value);
            } else {
                state[stateKey].push(value);  
            }
        },
        removeChecked: (state,action) => {
            const {type, payload} = action;
            state.currentPlaylist = state.currentPlaylist.filter(song => {
                return song.checkedPlaylist === false;
            })
            console.log(`## length of song list:`, state.currentPlaylist.length)
        },
        removeFromCurrentList: (state,action) => {
            const {type, payload} = action;
            const {id} = payload;
            state.currentPlaylist = state.currentPlaylist.filter(song => {
                return song.id !== id
            });
            if(state.currentPlaylist.length === 0){
                state.checkAll = false;
            }
        },
        setSongChecked: (state, action) => {
            const {type, payload} = action;
            const {id, checked} = payload;
            state.currentPlaylist = state.currentPlaylist.map((song,index) => {
                if(id === index){
                    song.checkedPlaylist = checked;
                }
                return song;
            })
        },
        setCurrentPlayingByIndex: (state, action) => {
            const {type, payload} = action;
            const {targetIndex, playing} = payload;
            if(playing === true) {
                state.currentPlaylist.forEach((song, index) => {
                    if(index === targetIndex){
                        song.currentPlaying = true;
                        return
                    }
                    song.currentPlaying = false;
                })
            }
            if(playing === false) state.currentPlaylist.forEach(song => song.currentPlaying = false);
        },
        toggleAllChecked: (state, action) => {
            if(state.currentPlaylist.every(song => song.checkedPlaylist)){
                state.currentPlaylist.forEach(song => song.checkedPlaylist = false);
                return
            }
            state.currentPlaylist.forEach(song => song.checkedPlaylist = true);
        },
    }
})

export const {
    pushObjectToState, 
    removeFromCurrentList, 
    setSongChecked, 
    removeChecked,
    setCurrentPlayingByIndex,
    toggleAllChecked,
} = playlistSlice.actions;

export default playlistSlice.reducer;