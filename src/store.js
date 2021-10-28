import { configureStore } from "@reduxjs/toolkit";
import albumReducer from './Components/Album/albumSlice'

export const store = configureStore({
    reducer: {
        album: albumReducer,
    }
})