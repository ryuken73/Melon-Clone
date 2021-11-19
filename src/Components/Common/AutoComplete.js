import * as React from 'react';
import Box from '@mui/material/Box';
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import colors from '../../config/colors';
import SpanBox from './SpanBox';
import {useQuery} from 'react-query';
import useDebounce from 'hooks/useDebounce';
import useQuerySuggest from 'hooks/useQuerySuggest';
import {setCurrent, setCurrentByInputValue} from './autoCompleteSlice';
import {useDispatch} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';

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
    background: ${colors.playerLight3};
  }
  &:hover {
    background: ${colors.playerLight3}
  }
  &:focus-within {
    background: yellow;
  }
`;

const querySuggests = async ({queryKey}) => {
  const [_key, uriEncoded ] = queryKey;
  if(uriEncoded.length < 2){
    return Promise.resolve({result:null, count:0})
  }
  const response = await fetch(`http://10.11.31.51:3010/searchSong/withWorkers/${uriEncoded}?userId=null&supportThreeWords=true&count=100`);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const UseAutocomplete = props => {
  const {history} = props;
  const [options, setOptions] = React.useState([]);
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
    filterOptions: options => options,
    getOptionLabel: (option) => `${option.artistName} ${option.songName}`,
  });

  const inputValue = getInputProps().value;
  const uriEncoded = encodeURIComponent(inputValue);
  const debounced = useDebounce(uriEncoded, 100);
  // const { isLoading, isError, data, error } = useQuery(['autocomplete', uriEncoded], querySuggests);
  const { isLoading, isError, data, error } = useQuerySuggest(debounced);
  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(isLoading !== true && isError !== true && data?.result !== undefined && data?.result !== null){
      setOptions(data.result.slice(0,100));
      return
    }
    data?.result === null && setOptions([]);
  },[data])

  React.useEffect(() => {
    console.log('^^ value changed:', value)
    const {artistName, songName} = value !== null ? value: {artistName:'', songName:''};
    dispatch(setCurrent({
     artistName,
     songName,
     inputValue 
    }))
    value !== null && history.push(`/searchResult/all/${inputValue}`);
  },[value, dispatch, history])

  const getHighlightParts = React.useCallback(option => {
    const matches = match(`${option.artistName}: ${option.songName}`, inputValue);
    const parts = parse(`${option.artistName}: ${option.songName}`, matches);
    return parts;
  },[inputValue]);

  const handleKeyDown = React.useCallback(event => {
    if(event.charCode === 13 && event.target.value.trim()){
      console.log('^^^ enter key pressed: ',event.target.value)
      dispatch(setCurrentByInputValue({
        artistName: '',
        songName: '',
        inputValue: event.target.value
      }))
      history.push(`/searchResult/all/${event.target.value}`);
    }
  },[dispatch, history])

  return (
    <div>
      <div {...getRootProps()}>
        <Input onKeyPressCapture={handleKeyDown} {...getInputProps()} />
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
                        fontWeight: part.highlight ? 900 : 500,
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