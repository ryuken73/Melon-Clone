import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentId: null,
    currentIndex: null,
    currentSrc: '',
    currentAlbumImage: ''
}

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            const {src, image, id, index} = payload
            state.currentSrc = src;
            state.currentAlbumImage = image;
            state.currentId = id;
            state.currentIndex = index;
        },
    }
})

export const {
    setCurrent
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;