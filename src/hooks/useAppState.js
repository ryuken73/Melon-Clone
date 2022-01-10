import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setOpenPlaySkinFlat} from 'appSlice';

function useAppState() {
  const openPlaySkinFlat = useSelector((state) => state.app.openPlaySkinFlat);
  const dispatch = useDispatch();
  const toggleFlatPlaylist = React.useCallback(() => {
    dispatch(setOpenPlaySkinFlat(!openPlaySkinFlat))
  },[dispatch, openPlaySkinFlat]);
  return {openPlaySkinFlat, toggleFlatPlaylist}
}

export default useAppState;