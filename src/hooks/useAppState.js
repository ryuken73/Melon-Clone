import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setOpenPlaySkinFlat, 
  setSearchResultPath, 
  setOrderByText
} from 'appSlice';

function useAppState() {
  const openPlaySkinFlat = useSelector((state) => state.app.openPlaySkinFlat);
  const searchResultPath = useSelector((state) => state.app.searchResultPath);
  const orderByTexts = useSelector((state) => state.app.orderByTexts);
  const dispatch = useDispatch();
  
  const toggleFlatPlaylist = React.useCallback(() => {
    dispatch(setOpenPlaySkinFlat(!openPlaySkinFlat))
  },[dispatch, openPlaySkinFlat]);

  const toggleResultPath = React.useCallback(path => {
    dispatch(setSearchResultPath(path))
  },[dispatch])

  const setOrderBy = React.useCallback(({page, orderby}) => {
    dispatch(setOrderByText({page, orderby}))
  },[dispatch])

  return {
    openPlaySkinFlat, 
    searchResultPath, 
    orderByTexts, 
    toggleFlatPlaylist, 
    toggleResultPath, 
    setOrderBy
  }
}

export default useAppState;