import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMessageBoxHidden: true,
    messageBoxText:'',
    messageBoxLevel: 'success',
    openPlaySkinFlat: false,
    searchResultPath: '/searchResult/all'
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
    setSearchResultPath
} = appSlice.actions;

export default appSlice.reducer;