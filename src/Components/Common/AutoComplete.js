import * as React from 'react';
import Box from '@mui/material/Box';
import {useAutocomplete} from '@mui/core/AutocompleteUnstyled';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import colors from '../../config/colors';
import SpanBox from './SpanBox';
import {useQuery} from 'react-query';
import useDebounce from 'hooks/useDebounce';
import useQuerySuggest from 'hooks/useQuerySuggest';
import useLocalStorage from 'hooks/useLocalStorage';
// import {setCurrent, setCurrentByInputValue} from './autoCompleteSlice';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {useHotkeys} from 'react-hotkeys-hook';

const Input = styled.input`
  width: 300px;
  height: 25px;
  background: ${colors.player};
  color: white;
  border: 1px solid rgba(255,255,255,.3);
  font-size: 12px;
  padding-right: 5px;
  padding-left: 5px;
  border-radius: 10px;
  :hover {
    background: ${colors.playerLight1};
    border: 1px solid rgba(255,255,255,.6);
  }
  :focus {
    background: ${colors.playerLight1};
    border: 1px solid rgba(255,255,255,.8);
    outline: none;
  }
`;
const Listbox = styled(Box)`
  width: 308px;
  height: auto;
  max-height: 40%;
  margin-top: 5px;
  padding: 0px;
  z-index: 1;
  border-radius: 10px;
  position: absolute;
  list-style: none;
  background: ${colors.playerLight1};
  overflow: auto;
  font-size: 12px;
  text-align: left;
  border: 1px solid rgba(255,255,255,0.4);
  &::-webkit-scrollbar {
    display: none;
  };
`;
const StyledList = styled(Box)`
  padding: 2px;
  margin: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  &.Mui-focusVisible {
    background: ${colors.autocompleteFocus};
  }
  &:hover {
    background: ${colors.autocompleteFocus};
  }
  &:focus-within {
    background: yellow;
  }
`;

const UseAutocomplete = props => {
  const {history} = props;
  const [options, setOptions] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(true);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: options,
    limit: 10,
    freeSolo: true,
    autoSelect: false,
    clearOnBlur: true,
    selectOnFocus: true,
    filterOptions: options => options,
    getOptionLabel: (option) => {
      if(typeof(option) === 'object'){
        return `${option.artistName} ${option.songName}`
      }
      return option;
    }
  });

  const [prevSearch, setPrevSearch] = useLocalStorage('prevSearch', {artistName:'', songName:''})
  const inputValue = getInputProps().value;
  const uriEncoded = encodeURIComponent(inputValue);
  const debounced = useDebounce(uriEncoded, 100);
  const inputRef = getInputProps().ref;
  useHotkeys('ctrl+q',() => {
    inputRef.current.focus()
    inputRef.current.select()
  }, [inputRef.current]);
  // const { isLoading, isError, data, error } = useQuery(['autocomplete', uriEncoded], querySuggests);
  const { isLoading, isError, data, error } = useQuerySuggest(debounced);
  const dispatch = useDispatch()

  React.useEffect(()=>{
    console.log('^^ result of useQuerySuggest: showOptions=',showOptions, isLoading, isError, data)
    if(showOptions && isLoading !== true && isError !== true && data?.result !== undefined && data?.result !== null){
      setOptions(data.result.slice(0,100));
      return
    }
    data?.result === null && setOptions([]);
    !isLoading && data === undefined && setOptions([]);
  },[data, isLoading, isError, showOptions])

  React.useEffect(() => {
    console.log('^^ value changed:', value)
    const {artistName, songName} = value !== null ? value: {artistName:'', songName:''};
    setPrevSearch({artistName, songName})
    const encodedArtist = encodeURIComponent(artistName);
    const encodedSong = encodeURIComponent(songName);
    const encodedInputValue = encodeURIComponent(inputValue);
    // value !== null && history.push(`/searchResult/all?exactSearch=yes&artistName=${artistName}&songName=${songName}&keyword=${inputValue}`);
    value !== null && history.push(`/searchResult/all?exactSearch=yes&artistName=${encodedArtist} &songName=${encodedSong}&keyword=${encodedInputValue}`);
  },[value, dispatch, history])

  const getHighlightParts = React.useCallback(option => {
    const matches = match(`${option.artistName}: ${option.songName}`, inputValue);
    const parts = parse(`${option.artistName}: ${option.songName}`, matches);
    return parts;
  },[inputValue]);

  const handleKeyPressed = React.useCallback(event => {
    setShowOptions(true);
    if(event.charCode === 13 && event.target.value.trim()){
      setShowOptions(false);
      console.log('^^^ enter key pressed: ',event.target.value)
      const {artistName, songName} = prevSearch;
      if(event.target.value === `${artistName} ${songName}`){
        const encodedArtist = encodeURIComponent(artistName);
        const encodedSong = encodeURIComponent(songName);
        const encodedInputValue = encodeURIComponent(inputValue);
        history.push(`/searchResult/all?exactSearch=yes&artistName=${encodedArtist}&songName=${encodedSong}&keyword=${encodedInputValue}`);
        return;
      }
      setOptions([]);
      history.push(`/searchResult/all?exactSearch=no&keyword=${encodeURIComponent(event.target.value)}`);
    }
  },[setShowOptions, history, prevSearch, inputValue])

  const handleKeyDown = React.useCallback(event => {
    setShowOptions(true);
  },[])

  const handleFocus = React.useCallback(event => {
    event.target.select();
  },[])

  return (
    <div>
      <div {...getRootProps()}>
        <Input 
          onKeyDownCapture={handleKeyDown} 
          onKeyPressCapture={handleKeyPressed} 
          onFocus={handleFocus}
          placeholder="control + q"
          {...getInputProps()} 
        />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <StyledList 
              {...getOptionProps({option, index})} 
             >
              {getHighlightParts(option).map((part, index) => (
                <SpanBox 
                    key={index} 
                    style={{
                        fontWeight: part.highlight ? 400 : 100,
                        color: part.highlight && "white",

                    }} 
                    text={part.text}
                ></SpanBox>
              ))}
            </StyledList>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

export default React.memo(withRouter(UseAutocomplete));