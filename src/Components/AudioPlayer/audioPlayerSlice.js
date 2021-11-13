import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentSrc: '',
    currentAlbumImage: ''
}

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            const {src, image} = payload
            state.currentSrc = src;
            state.currentAlbumImage = image;
        },
    }
})

export const {
    setCurrent
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;