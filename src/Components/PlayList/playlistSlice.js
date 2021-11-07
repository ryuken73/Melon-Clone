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
        removeChecked: (state,action) => {
            const {type, payload} = action;
            state.currentPlaylist = state.currentPlaylist.filter(song => {
                return song.checked === false;
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
            state.currentPlaylist = state.currentPlaylist.map(song => {
                if(song.id === id){
                    song.checked = checked;
                }
                return song;
            })
        },
        toggleAllChecked: (state, action) => {
            if(state.currentPlaylist.every(song => song.checked)){
                state.currentPlaylist.forEach(song => song.checked = false);
                return
            }
            state.currentPlaylist.forEach(song => song.checked = true);
        },
    }
})

export const {
    pushObjectToState, 
    removeFromCurrentList, 
    setSongChecked, 
    removeChecked,
    toggleAllChecked,
} = playlistSlice.actions;

export default playlistSlice.reducer;