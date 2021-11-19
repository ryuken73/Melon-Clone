import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    artistName:'',
    songName:'',
    inputValue:''
}

export const autoCompleteSlice = createSlice({
    name: 'autoComplete',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            const {type, payload} = action;
            console.log(`^^called reducer:`,payload)
            state.artistName = payload.artistName;
            state.songName = payload.songName;
            state.inputValue = payload.inputValue;
        },
        setCurrentByInputValue: (state, action) => {
            const {type, payload} = action;
            console.log(`^^called reducer:`,payload)
            const {artistName, songName, inputValue} = payload;
            const {
                artistName: prevArtistName,
                songName: prevSongName,
                inputValue: prevInputValue
             } = state;
            const isPrevExists = prevArtistName !== '' || prevSongName !== '';
            if(inputValue === prevInputValue && isPrevExists){
                // exact search. not reset artistName
                console.log('^^: should be exact search!', prevArtistName, prevSongName, prevInputValue);
                state.inputValue = inputValue;
                return;
            }
            state.artistName = artistName;
            state.songName = songName;
            state.inputValue = inputValue;
        },
    }
})

export const {
    setCurrent,
    setCurrentByInputValue
} = autoCompleteSlice.actions;

export default autoCompleteSlice.reducer;