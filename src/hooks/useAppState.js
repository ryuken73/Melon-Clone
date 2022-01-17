import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setOpenPlaySkinFlat, setSearchResultPath} from 'appSlice';

function useAppState() {
  const openPlaySkinFlat = useSelector((state) => state.app.openPlaySkinFlat);
  const searchResultPath = useSelector((state) => state.app.searchResultPath);
  const dispatch = useDispatch();
  const toggleFlatPlaylist = React.useCallback(() => {
    dispatch(setOpenPlaySkinFlat(!openPlaySkinFlat))
  },[dispatch, openPlaySkinFlat]);
  const toggleResultPath = React.useCallback(path => {
    dispatch(setSearchResultPath(path))
  },[dispatch])
  return {openPlaySkinFlat, searchResultPath, toggleFlatPlaylist, toggleResultPath}
}

export default useAppState;