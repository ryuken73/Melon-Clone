import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        },
        delCheckedList: (state, action) => {
            const {type, payload} = action;
            const {song} = payload;
            state.checkedSongList = state.checkedSongList.filter(checkedSong => checkedSong.id !== song.id);
        },
        clearCheckedList: (state, action) => {
            state.checkedSongList = [];
        }
    }
})

export const {
    addCheckedList,
    delCheckedList,
    clearCheckedList
} = songHelperSlice.actions;

export default songHelperSlice.reducer;