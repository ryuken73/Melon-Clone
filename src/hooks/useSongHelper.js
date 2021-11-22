import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addCheckedList, delCheckedList, clearCheckedList} from 'Components/SongHelper/songHelperSlice';

function useSongHelper(id) {
  const dispatch = useDispatch();
  const checkedSongList = useSelector(state => state.songHelper.checkedSongList)
  const checked = useSelector(state => state.songHelper.checkedSongList.some(checkedSong => checkedSong.id === id));
  const addChecked = React.useCallback(song => {
    dispatch(addCheckedList({song: song.parsedWithoutBTag}))
  },[dispatch])
  const delChecked = React.useCallback(song => {
    dispatch(delCheckedList({song}))
  },[dispatch])
  const clearChecked = React.useCallback(song => {
    dispatch(clearCheckedList())
  },[dispatch])
  return {checkedSongList, addChecked, delChecked, clearChecked, checked}
}

export default useSongHelper;