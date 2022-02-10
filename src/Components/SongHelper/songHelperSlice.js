import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalCount:0,
    checkedSongList:[],
    lastCheckedId:null
}

export const songHelperSlice = createSlice({
    name: 'songHelper',
    initialState,
    reducers: {
        addCheckedList: (state, action) => {
            const {type, payload} = action;
            const {song} = payload;
            state.lastCheckedId = song.id;
            state.checkedSongList.push(song);
            state.totalCount = state.checkedSongList.length;
        },
        delCheckedList: (state, action) => {
            const {type, payload} = action;
            const {song} = payload;
            state.lastCheckedId = song.id;
            state.checkedSongList = state.checkedSongList.filter(checkedSong => checkedSong.id !== song.id);
            state.totalCount = state.checkedSongList.length;
        },
        clearCheckedList: (state, action) => {
            state.checkedSongList = [];
            state.totalCount = state.checkedSongList.length;
        },
        setCheckedList: (state, action) => {
            const {type, payload} = action;
            const {songs} = payload;
            state.checkedSongList = songs;
            state.totalCount=songs.length;
        },
        setCheckedBetween: (state, action) => {
            const {type, payload} = action;
            const {targetSongList, fromIndex, toIndex, checked} = payload;
            const songsBetween = [...targetSongList.slice(fromIndex, toIndex+1)];
            console.log(songsBetween)
            songsBetween.forEach((song, index) => {
                if(checked){
                    if(!state.checkedSongList.some(songInList => songInList.id === song.id)){
                        state.checkedSongList.push(song);
                    }
                } else {
                    state.checkedSongList = state.checkedSongList.filter(songInList => songInList.id !== song.id);
                }
            }) 
            state.totalCount=state.checkedSongList.length;
        }
    }
})

export const {
    addCheckedList,
    delCheckedList,
    clearCheckedList,
    setCheckedList,
    setCheckedBetween
} = songHelperSlice.actions;

export default songHelperSlice.reducer;