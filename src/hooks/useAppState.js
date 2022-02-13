import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoginId,
  setLoginSession,
  setOpenPlaySkinFlat, 
  setSearchResultPath, 
  setOrderByText,
  setOrderByTextDefault,
  setCurrentOrderByString,
  setCurrentOrderByDirection,
} from 'appSlice';
import CONSTANTS from 'config/constants';
const {DEFAULT_ORDER_BY_TEXT} = CONSTANTS;

function useAppState() {
  const loginId = useSelector((state) => state.app.loginId);
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

  const setOrderByDefault = React.useCallback(({page}) => {
    dispatch(setOrderByTextDefault({page}))
  },[dispatch])

  const setOrderByStringPart = React.useCallback(({page, orderByString}) => {
    dispatch(setCurrentOrderByString({page, orderByString}))
  },[dispatch])

  const setOrderByDirectionPart = React.useCallback(({page, orderByDirection}) => {
    dispatch(setCurrentOrderByDirection({page, orderByDirection}))
  },[dispatch])

  const isOrderByDefault = React.useCallback(page => {
    return orderByTexts[page] === DEFAULT_ORDER_BY_TEXT[page]
  },[orderByTexts])

  const saveLoginId = React.useCallback(userId => {
    dispatch(setLoginId(userId))
  },[dispatch])

  const saveLoginSession = React.useCallback(session => {
    dispatch(setLoginId(session))
  },[dispatch])

  return {
    loginId,
    saveLoginId,
    saveLoginSession,
    openPlaySkinFlat, 
    searchResultPath, 
    orderByTexts, 
    orderByStrings, 
    orderByDirections, 
    toggleFlatPlaylist, 
    toggleResultPath, 
    setOrderBy,
    setOrderByDefault,
    setOrderByStringPart,
    setOrderByDirectionPart,
    isOrderByDefault
  }
}

export default useAppState;