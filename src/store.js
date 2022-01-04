import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';
import appReducer from 'appSlice'
import albumReducer from 'Components/Album/albumSlice'
import playlistSlice from 'Components/PlayList/playlistSlice'
import audioPlayerSlice from 'Components/AudioPlayer/audioPlayerSlice'
// import autoCompleteSlice from 'Components/Common/autoCompleteSlice'
import songHelperSlice from 'Components/SongHelper/songHelperSlice'
import CONSTANTS from 'config/constants';
const {LOGLESS_REDUX_ACTIONS=[]} = CONSTANTS;

const logger = createLogger({
  predicate: (getState, action) => ! LOGLESS_REDUX_ACTIONS.includes(action.type)
});

export const store = configureStore({
    reducer: {
        app: appReducer,
        album: albumReducer,
        playlist: playlistSlice,
        audioPlayer: audioPlayerSlice,
        // autoComplete: autoCompleteSlice,
        songHelper: songHelperSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
})