import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {removeFromCurrentList,  setSongChecked} from 'Components/PlayList/playlistSlice';

function usePlaylist(id) {
  const dispatch = useDispatch();
  console.log('####:',id)
  const removeFromPlaylist = React.useCallback(() => {
    dispatch(removeFromCurrentList({id}))
  },[dispatch, id])

  const setChecked = React.useCallback((checked) => {
    console.log(id, checked)
    dispatch(setSongChecked({id, checked}))
  },[dispatch, id])

  return [removeFromPlaylist, setChecked];
}

export default usePlaylist;