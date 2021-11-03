import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getDefaultNormalizer } from "@testing-library/dom";
import { createLogger } from 'redux-logger';
import albumReducer from './Components/Album/albumSlice'

const logger = createLogger();

export const store = configureStore({
    reducer: {
        album: albumReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
})