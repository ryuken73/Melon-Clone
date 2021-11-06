import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';
import appReducer from 'appSlice'
import albumReducer from 'Components/Album/albumSlice'
import playlistSlice from 'Components/PlayList/playlistSlice'

const logger = createLogger();

export const store = configureStore({
    reducer: {
        app: appReducer,
        album: albumReducer,
        playlist: playlistSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
})