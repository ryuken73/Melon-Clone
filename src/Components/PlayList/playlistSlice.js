import {createSlice} from "@reduxjs/toolkit";

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
        pushSongsToCurrentlist: (state, action) => {
            console.log(action);
            const {type, payload} = action;
            const {songsParsed} = payload;
            state.currentPlaylist = [...songsParsed, ...state.currentPlaylist];
        },
        removeChecked: (state,action) => {
            const {type, payload} = action;
            state.currentPlaylist = state.currentPlaylist.filter(song => {
                // uncheck below line, if you don't want to remove song from playlist now playing
                // return song.currentPlaying || song.checkedPlaylist === false; 
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
            state.currentPlaylist = state.currentPlaylist.map(song => {
                if(song.id === id){
                    song.checkedPlaylist = checked;
                }
                return song;
            })
        },
        setSongLastChecked: (state, action) => {
            const {type, payload} = action;
            const {id} = payload;
            state.currentPlaylist = state.currentPlaylist.map(song => {
                if(song.id === id){
                    song.lastChecked = true;
                } else {
                    song.lastChecked = false;
                }
                return song;
            })
        },
        setSongCheckedBetween: (state, action) => {
            const {type, payload} = action;
            const {fromIndex, toIndex, checked} = payload;
            state.currentPlaylist = state.currentPlaylist.map((song, index) => {
                if(index > fromIndex && index <= toIndex){
                    song.checkedPlaylist = checked;
                }
                return song;
            })
        },
        setCurrentPlayingBySrc: (state, action) => {
            const {type, payload} = action;
            const {src, id, playing} = payload;
            if(playing === true) {
                state.currentPlaylist.forEach((song, index) => {
                    if(song.src === src || song.id === id){
                        song.currentPlaying = true;
                        return
                    }
                    song.currentPlaying = false;
                })
            }
            if(playing === false) state.currentPlaylist.forEach(song => song.currentPlaying = false);
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
        clearChecked: (state, action) => {
            state.currentPlaylist.forEach(song => song.checkedPlaylist = false);
        },
        setCurrentPlayList: (state, action) => {
            const {type, payload} = action;
            const {currentPlaylist} = payload;
            state.currentPlaylist = currentPlaylist;
        }
    }
})

export const {
    pushObjectToState, 
    pushSongsToCurrentlist,
    removeFromCurrentList, 
    setSongChecked, 
    setSongLastChecked, 
    setSongCheckedBetween,
    removeChecked,
    setCurrentPlayingByIndex,
    setCurrentPlayingBySrc,
    toggleAllChecked,
    clearChecked,
    setCurrentPlayList
} = playlistSlice.actions;

export default playlistSlice.reducer;