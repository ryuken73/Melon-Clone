import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  doListAlbum, 
  toggleSongCheckedInSongList, 
  toggleAllSongsCheckedInSongList, 
  addSongsInAlbumToCurrentPlaylist 
} from 'Components/Album/albumSlice';
import useAudioPlayer from './useAudioPlayer';

const isArrayValid = array => array !== undefined && array !== null && array.length !== 0;

function useSongsInAlbum(receipt_no, rownum) {
  const songsInAlbum = useSelector((state) => state.album.songListInAlbum[receipt_no]);
  const firstSong = React.useMemo(() => {
    return songsInAlbum && songsInAlbum.length > 0 ? songsInAlbum[0] : {};
  },[songsInAlbum]);
  const {setPlayerSource} = useAudioPlayer();
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

  const addAllSongsInAlbum = React.useCallback(() => {
    dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no}));
  },[receipt_no, dispatch])

  const addSongByRownum = React.useCallback(() => {
    dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no, rownum}));
  },[receipt_no, rownum, dispatch])

  const addSongChecked = React.useCallback(() => {
    dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no, allChecked:true}));
  },[receipt_no, dispatch])

  const addSongByRownumNPlay = React.useCallback((src, albumImageSrc) => {
    dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no, rownum}));
    setPlayerSource(src, albumImageSrc, 0);
  },[receipt_no, rownum, dispatch, setPlayerSource])

  const playFirstSongInAlbum = React.useCallback(() => {
    const {src, albumImageSrc} = firstSong;
    setPlayerSource(src, albumImageSrc, 0);
  },[firstSong, setPlayerSource])


  const checkedCount = isArrayValid(songsInAlbum) && songsInAlbum.reduce((acct, song) => {
  if(song.checkedSongList){
      return acct + 1;
    }
    return acct;
  },0)

  return {
    songsInAlbum: songsInAlbum || [], 
    checkedCount, 
    toggleSongChecked, 
    toggleAllSongChecked, 
    addAllSongsInAlbum, 
    addSongByRownum, 
    addSongChecked,
    addSongByRownumNPlay, 
    playFirstSongInAlbum,
    allChecked
  } ;
}

export default useSongsInAlbum;