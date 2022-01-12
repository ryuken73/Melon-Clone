import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentId: null,
    currentIndex: null,
    currentSrc: '',
    currentSrcType: '',
    currentAlbumImage: '',
    volume: 0.5,
    endedTime: '',
    isPlaying: false,
    currentTime:'00:00',
    progress:0,
    muted: false,
    repeatMode: 'none',
    manifestLoaded: false,
    duration: "00:00"
}

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            const {src, image, index, id, srcType} = payload
            state.currentSrc = src;
            state.currentAlbumImage = image;
            state.currentIndex = index;
            state.currentId = id;
            state.currentSrcType = srcType;
        },
        setVolume: (state, action) => {
            const {type, payload} = action;
            const {volume} = payload
            state.volume = volume;
        },
        setEndedTime: (state, action) => {
            const {type, payload} = action;
            const {endedTime} = payload
            state.endedTime = endedTime;
        },
        setIsPlaying: (state, action) => {
            const {type, payload} = action;
            const {isPlaying} = payload
            state.isPlaying = isPlaying;
        },
        setCurrentTime: (state, action) => {
            const {type, payload} = action;
            const {currentTime} = payload
            state.currentTime = currentTime;
        },
        setProgress: (state, action) => {
            const {type, payload} = action;
            const {progress} = payload
            state.progress = progress;
        },
        setMuted: (state, action) => {
            const {type, payload} = action;
            const {muted} = payload
            state.muted = muted;
        },
        setRepeatMode: (state, action) => {
            const {type, payload} = action;
            const {repeatMode} = payload
            state.repeatMode = repeatMode;
        },
        setManifestLoaded: (state, action) => {
            const {type, payload} = action;
            const {manifestLoaded} = payload
            state.manifestLoaded = manifestLoaded;
        },
        setDuration: (state, action) => {
            const {type, payload} = action;
            const {duration} = payload
            state.duration = duration;
        },
    }
})

export const {
    setCurrent,
    setVolume,
    setEndedTime,
    setIsPlaying,
    setCurrentTime,
    setProgress,
    setMuted,
    setRepeatMode,
    setManifestLoaded,
    setDuration
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;