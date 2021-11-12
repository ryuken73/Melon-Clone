import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isMessageBoxHidden: true,
    messageBoxText:''
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
    }
})

export const showMessageBoxForDuration = (text, duration=1000) => async (dispatch, getState) => {
    dispatch(setMessageBoxText(text));
    dispatch(setMessageBoxHide(false));
    setTimeout(()=>{
        dispatch(setMessageBoxHide(true));
    }, [duration])
    setTimeout(()=>{
        const state = getState();
        if(state.app.isMessageBoxHidden) dispatch(setMessageBoxText(''));
    }, [duration+500])

}

export const {setMessageBoxHide, setMessageBoxText} = appSlice.actions;
export default appSlice.reducer;