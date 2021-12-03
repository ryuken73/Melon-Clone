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
            const {src, image, index, id} = payload
            state.currentSrc = src;
            state.currentAlbumImage = image;
            state.currentIndex = index;
            state.currentId = id;
        },
    }
})

export const {
    setCurrent
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;