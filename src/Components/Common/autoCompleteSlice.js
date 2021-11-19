import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    artistName:null,
    songName:null,
    inputValue:null
}

export const autoCompleteSlice = createSlice({
    name: 'autoComplete',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            console.log(`^^called reducer:`,payload)
            state.artistName = payload.artistName;
            state.songName = payload.songName;
            state.inputValue = payload.inputValue;
        },
    }
})

export const {
    setCurrent
} = autoCompleteSlice.actions;

export default autoCompleteSlice.reducer;