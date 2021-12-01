import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalCount:0,
    checkedSongList:[] 
}

export const songHelperSlice = createSlice({
    name: 'songHelper',
    initialState,
    reducers: {
        addCheckedList: (state, action) => {
            const {type, payload} = action;
            const {song} = payload;
            state.checkedSongList.push(song);
            state.totalCount+=1
        },
        delCheckedList: (state, action) => {
            const {type, payload} = action;
            const {song} = payload;
            state.checkedSongList = state.checkedSongList.filter(checkedSong => checkedSong.id !== song.id);
            state.totalCount-=1
        },
        clearCheckedList: (state, action) => {
            state.checkedSongList = [];
            state.totalCount-=0
        },
        setCheckedList: (state, action) => {
            const {type, payload} = action;
            const {songs} = payload;
            state.checkedSongList = songs;
            state.totalCount=songs.length;
        }
    }
})

export const {
    addCheckedList,
    delCheckedList,
    clearCheckedList,
    setCheckedList
} = songHelperSlice.actions;

export default songHelperSlice.reducer;