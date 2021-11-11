import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  doListAlbum, 
  toggleSongCheckedInSongList, 
  toggleAllSongsCheckedInSongList, 
  addSongsInAlbumToCurrentPlaylist 
} from 'Components/Album/albumSlice';

const isArrayValid = array => array !== undefined && array !== null && array.length !== 0;

function useSongsInAlbum(receipt_no, rownum) {
  const songsInAlbum = useSelector((state) => state.album.songListInAlbum[receipt_no]);
  const allChecked = isArrayValid(songsInAlbum) ? songsInAlbum.every(song => song.checkedSongList) : false;
  const dispatch = useDispatch();
  React.useEffect(()=>{
      dispatch(doListAlbum({receipt_no}));
  },[receipt_no, dispatch])

  const toggleSongChecked = React.useCallback(() => {
    dispatch(toggleSongCheckedInSongList({receipt_no, rownum}))
  },[receipt_no, rownum, dispatch])

  const toggleAllSongChecked = React.useCallback(() => {
    dispatch(toggleAllSongsCheckedInSongList({receipt_no}));
  },[receipt_no, dispatch])

  const addSongByRownum = React.useCallback(() => {
    dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no, rownum}));
  },[receipt_no, rownum, dispatch])


  const checkedCount = isArrayValid(songsInAlbum) && songsInAlbum.reduce((acct, song) => {
  if(song.checkedSongList){
      return acct + 1;
    }
    return acct;
  },0)

  return {songsInAlbum: songsInAlbum || [], checkedCount, toggleSongChecked, toggleAllSongChecked, addSongByRownum, allChecked} ;
}

export default useSongsInAlbum;