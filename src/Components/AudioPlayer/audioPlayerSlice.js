import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentId: null,
    currentSrc: '',
    currentAlbumImage: ''
}

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            const {src, image, id} = payload
            state.currentSrc = src;
            state.currentAlbumImage = image;
            state.currentId = id;
        },
    }
})

export const {
    setCurrent
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;