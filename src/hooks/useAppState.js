import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setOpenPlaySkinFlat, 
  setSearchResultPath, 
  setOrderByText,
  setCurrentOrderByString,
  setCurrentOrderByDirection,
} from 'appSlice';

function useAppState() {
  const openPlaySkinFlat = useSelector((state) => state.app.openPlaySkinFlat);
  const searchResultPath = useSelector((state) => state.app.searchResultPath);
  const orderByTexts = useSelector((state) => state.app.orderByTexts);
  const orderByStrings = useSelector((state) => state.app.orderByStrings);
  const orderByDirections = useSelector((state) => state.app.orderByDirections);
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

  const setOrderByString = React.useCallback(({page, orderByString}) => {
    dispatch(setCurrentOrderByString({page, orderByString}))
  },[dispatch])

  const setOrderByDirection = React.useCallback(({page, orderByDirection}) => {
    dispatch(setCurrentOrderByDirection({page, orderByDirection}))
  },[dispatch])

  return {
    openPlaySkinFlat, 
    searchResultPath, 
    orderByTexts, 
    orderByStrings, 
    orderByDirections, 
    toggleFlatPlaylist, 
    toggleResultPath, 
    setOrderBy,
    setOrderByString,
    setOrderByDirection,
  }
}

export default useAppState;