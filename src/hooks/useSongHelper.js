import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addCheckedList, delCheckedList, clearCheckedList, setCheckedList} from 'Components/SongHelper/songHelperSlice';

function useSongHelper(id) {
  const dispatch = useDispatch();
  const checkedSongList = useSelector(state => state.songHelper.checkedSongList);
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
  const toggleAllSongChecked = React.useCallback(songs => {
    console.log('****:',songs);
    if(checkedSongList.length > 0){
      // clear all checked
      dispatch(clearCheckedList())
    } else {
      dispatch(setCheckedList({songs:songs.map(song => song.parsedWithoutBTag)}));
      // songs.forEach(song => {
      //   dispatch(addCheckedList({song: song.parsedWithoutBTag}))
      // })
    }
  },[checkedSongList, dispatch])
  const isAllChecked = React.useCallback(songs => {
    const allChecked = checkedSongList.length === songs.length;
    return allChecked;
  },[checkedSongList]);

  return {checkedSongList, addChecked, delChecked, clearChecked, checked, toggleAllSongChecked, isAllChecked}
}

export default useSongHelper;