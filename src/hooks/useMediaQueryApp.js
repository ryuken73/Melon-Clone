import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {
  WIDTH_TO_HIDE_SIDE_PANEL, 
} = CONSTANTS;

function useMediaQueryApp(){
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);

  return {
    hideRightPane,
  }
}

export default useMediaQueryApp;