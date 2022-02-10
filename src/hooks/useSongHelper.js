import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCheckedList, 
  delCheckedList, 
  clearCheckedList, 
  setCheckedList, 
  setCheckedBetween
} from 'Components/SongHelper/songHelperSlice';

function useSongHelper(id) {
  const dispatch = useDispatch();
  const checkedSongList = useSelector(state => state.songHelper.checkedSongList);
  const lastCheckedId = useSelector(state => state.songHelper.lastCheckedId);
  const checked = useSelector(state => state.songHelper.checkedSongList.some(checkedSong => checkedSong.id === id));
  const addChecked = React.useCallback(song => {
    dispatch(addCheckedList({song: song.parsedWithoutBTag}))
  },[dispatch])
  const delChecked = React.useCallback(song => {
    dispatch(delCheckedList({song: song.parsedWithoutBTag}))
  },[dispatch])
  const clearChecked = React.useCallback(song => {
    dispatch(clearCheckedList())
  },[dispatch])
  const setCheckedFromLastToThis = React.useCallback(songs => {
    const lastCheckedIndex = songs.findIndex(song => song.id === lastCheckedId);
    if(lastCheckedIndex === undefined) return;
    const thisIndex = songs.findIndex(song => song.id === id);
    const valueToSet = checkedSongList.some(song => song.id === lastCheckedId);
    const fromIndex = thisIndex > lastCheckedIndex ? lastCheckedIndex : thisIndex;
    const toIndex = thisIndex > lastCheckedIndex ? thisIndex : lastCheckedIndex;
    console.log(fromIndex, toIndex)
    const songsForState = songs.map(song => song.parsedWithoutBTag);
    dispatch(setCheckedBetween({targetSongList:songsForState, fromIndex, toIndex, checked: valueToSet}));
  },[dispatch, id, lastCheckedId, checkedSongList])
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

  return {
    checkedSongList, 
    addChecked, 
    delChecked, 
    clearChecked, 
    checked, 
    toggleAllSongChecked, 
    setCheckedFromLastToThis, 
    isAllChecked
  }
}

export default useSongHelper;