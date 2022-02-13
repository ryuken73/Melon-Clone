import {createSlice} from "@reduxjs/toolkit";
import CONSTANTS from 'config/constants';
const {DEFAULT_ORDER_BY_TEXT} = CONSTANTS
const initialState = {
    loginId:null,
    loginSession:null,
    isMessageBoxHidden: true,
    messageBoxText:'',
    messageBoxLevel: 'success',
    openPlaySkinFlat: false,
    searchResultPath: '/searchResult/all',
    orderByTexts: {
        'albumList': DEFAULT_ORDER_BY_TEXT['albumList'],
        'albumsOfArtist': DEFAULT_ORDER_BY_TEXT['albumsOfArtist'],
        'archiveList': DEFAULT_ORDER_BY_TEXT['archiveList'],
        'songList': DEFAULT_ORDER_BY_TEXT['songList']
    },
    orderByStrings: {},
    orderByDirections: {},
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setLoginId: (state, action) => {
            const {type, payload} = action;
            state.loginId = payload;
        },
        setLoginSession: (state, action) => {
            const {type, payload} = action;
            state.loginSession = payload;
        },
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
        },
        setOrderByTextDefault: (state, action) => {
            const {type, payload} = action;
            const {page} = payload;
            state.orderByTexts[page] = DEFAULT_ORDER_BY_TEXT[page];
            state.orderByStrings[page] = '';
            state.orderByDirections[page] = '';
        },
        setCurrentOrderByString: (state, action) => {
            const {type, payload} = action;
            const {page, orderByString} = payload;
            state.orderByStrings[page] = orderByString;
        },
        setCurrentOrderByDirection: (state, action) => {
            const {type, payload} = action;
            const {page, orderByDirection} = payload;
            state.orderByDirections[page] = orderByDirection;
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
    setLoginId,
    setLoginSession,
    setMessageBoxHide, 
    setMessageBoxText, 
    setMessageBoxLevel,
    setOpenPlaySkinFlat,
    setSearchResultPath,
    setOrderByText,
    setOrderByTextDefault,
    setCurrentOrderByString,
    setCurrentOrderByDirection,
} = appSlice.actions;

export default appSlice.reducer;