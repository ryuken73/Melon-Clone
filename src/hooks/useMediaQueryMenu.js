import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {
  WIDTH_TO_HIDE_MENU_PANEL, 
} = CONSTANTS;

function useMediaQueryMenu(){
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_MENU_PANEL})`);

  return {
    hideLeftPane,
  }
}

export default useMediaQueryMenu;