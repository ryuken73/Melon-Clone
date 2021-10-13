import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextBox from './TextBox';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import axios from 'axios';
import debounce from 'lodash/debounce';
import colors from '../../config/colors';
import BoxWithScrollbar from './BoxWithScrollbar';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const defaultBgColor = colors.centerPane;
const StyledAutocomplete = styled(Autocomplete)`
  width: 200px;
  margin-top: ${props => props.mt || "0px"};
  margin-bottom: ${props => props.mb || "0px"};
  background: ${props => props.bgcolor || defaultBgColor};
  .MuiFormLabel-root {
    color: white;
    font-size: 12px;
  }
  .MuiOutlinedInput-root {
    color: white;
    border-radius: 20px;
    font-size: 12px;
    line-height: 13px;

    & fieldset {
      border-color: ${colors.lightCenterPane};
    },
    &:hover fieldset {
      border-color: ${colors.light2CenterPane};
    },
    &.Mui-focused fieldset {
      border-color: ${colors.light3CenterPane};
    },
  }
`
// const AbsoluteBox = styled(Box)`
//     position: absolute;
//     inset: 0px auto auto 0px;
//     width: 200px;
//     transform: translate(780px, 45px);
//     overflow: hidden;
//     border-radius: 20px;
// `

const ListBox = styled.ul`
  && {
    width: 200px;
  margin: 10px;
  padding: 0;
  z-index: 1;
  position: absolute;
  list-style: none;
  background-color: black;
  overflow: hidden;
  max-height: 200;
  border: 1px solid rgba(0,0,0,.25);
  border-radius: 0px;
  text-align: left;
  & li[data-focus=true] {
    background-color: white;
    color: white;
    cursor: pointer;
  };
  & li:active {
    background-color: yellow;
    color: white;
  };
  }

`

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <StyledAutocomplete
      id="asynchronous-demo"
      open={open}
      size="small"
      onOpen={() => {
        setOpen(true);
        // debugger;
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      value={value}
      onInputChange={(event, inputValue) => {setInputValue(inputValue)}}
    //   loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
        >
        </TextField>
      )}
      PaperComponent={({children}) => (
          <BoxWithScrollbar>{children}</BoxWithScrollbar>
      )}
    //   PopperComponent={({children}) => (
    //       <AbsoluteBox>{children}</AbsoluteBox>
    //   )}
      ListboxComponent={({children}) => (
        <ListBox role="listbox">{children}</ListBox>
      )}

      renderOption={(props, option) => {
        console.log(option.title, inputValue)
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);
        return (
              <div>
              {parts.map((part, index) => (
                <span key={index} style={{ fontSize:"12px", fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              </div>
        );
      }}
    />
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: '하늘은 왜', year: 2014 },
];