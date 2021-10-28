import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value += 1;
        }
    }
})

export const {increment} = albumSlice.actions;
export default albumSlice.reducer;