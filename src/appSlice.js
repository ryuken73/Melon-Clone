import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMessageBoxHidden: true,
    messageBoxText:'',
    messageBoxLevel: 'success',
    openPlaySkinFlat: false,
    searchResultPath: '/searchResult/all',
    orderByTexts: {
        'albumList': 'order by open_dt desc',
        'albumsOfArtist': 'order by release_year desc',
        'archiveList': 'order by brd_dd desc',
        'songList': 'order by release_year desc,song_name_str asc'
    }
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setMessageBoxHide: (state, action) => {
            const {type, payload} = action;
            state.isMessageBoxHidden = payload;
        },
        setMessageBoxText: (state, action) => {
            const {type, payload} = action;
            state.messageBoxText = payload;
        },
        setMessageBoxLevel: (state, action) => {
            const {type, payload} = action;
            state.messageBoxLevel = payload;
        },
        setOpenPlaySkinFlat: (state, action) => {
            const {type, payload} = action;
            state.openPlaySkinFlat = payload;
        },
        setSearchResultPath: (state, action) => {
            const {type, payload} = action;
            state.searchResultPath = payload;
        },
        setOrderByText: (state, action) => {
            const {type, payload} = action;
            const {page, orderby} = payload;
            state.orderByTexts[page] = orderby;
        }
    }
})

export const showMessageBoxForDuration = (text, duration=1000, level='success') => async (dispatch, getState) => {
    dispatch(setMessageBoxText(text));
    dispatch(setMessageBoxHide(false));
    dispatch(setMessageBoxLevel(level));
    setTimeout(()=>{
        dispatch(setMessageBoxHide(true));
    }, [duration])
    setTimeout(()=>{
        const state = getState();
        if(state.app.isMessageBoxHidden) {
            dispatch(setMessageBoxText(''));
            dispatch(setMessageBoxText('success'));
        }
    }, [duration+500])

}

export const {
    setMessageBoxHide, 
    setMessageBoxText, 
    setMessageBoxLevel,
    setOpenPlaySkinFlat,
    setSearchResultPath,
    setOrderByText,
} = appSlice.actions;

export default appSlice.reducer;