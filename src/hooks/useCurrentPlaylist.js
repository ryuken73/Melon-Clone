import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {pushObjectToState, pushSongsToCurrentlist, removeChecked, toggleAllChecked, hasSong} from 'Components/PlayList/playlistSlice';
import usePlayerState from './usePlayerState';
import useMessageBox from './useMessageBox';

const checkDuplidate = (songsRequested, currentPlaylist) => {
  console.log('### check duplicate result: req and current ', songsRequested, currentPlaylist);
  if(currentPlaylist.length === 0) {
    return [songsRequested, []]
  }
  const songsToAdd = songsRequested.reduce((acct, songToRequest) => {
    if(currentPlaylist.find(currentSong => currentSong.id === songToRequest.id) === undefined){
      return [...acct, songToRequest]
    }
    return [...acct]
  },[])
  const songsDuplicated = songsRequested.reduce((acct, songToRequest) => {
    if(currentPlaylist.find(currentSong => currentSong.id === songToRequest.id) !== undefined){
      return [...acct, songToRequest]
    }
    return [...acct]
  },[])
  return [songsToAdd, songsDuplicated];
}

function useCurrentPlaylist() {
  const {showMessageBox} = useMessageBox();
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  const allChecked = React.useMemo(() => {
    return currentPlaylist.length === 0 ? false : currentPlaylist.every(song => song.checkedPlaylist)
  },[currentPlaylist])
  // console.log('#### useCurrentPlaylist:', allChecked);
  const {src:currentSrc, setPlayerSource} = usePlayerState();
  const dispatch = useDispatch();

  const addSongsToCurrentPlaylist = React.useCallback((songs, playAfterAdd) => {
    console.log('### add songs batch: ', songs);
    const songsArray = Array.isArray(songs) ? songs: [songs];
    const [songsToAdd, songsDuplicated] = checkDuplidate(songsArray, currentPlaylist);
    console.log('### check duplicate result: ', songsToAdd, songsDuplicated);
    const songsParsed = songsToAdd.map(song => {
      const songWithoutBTag = song.parsedWithoutBTag || song;
      console.log('### songWithoutBTag: ', songWithoutBTag);
      return {
        ...songWithoutBTag,
        checkedPlaylist: false,
        currentPlaying: false
      }   
    });
    dispatch(pushSongsToCurrentlist({songsParsed}));
    let message;
    if(songsToAdd.length === 0 && songsDuplicated.length !== 0){
      message = `${songsDuplicated.length}곡이 이미 재생목록에 존재 합니다.`
    } else if(songsToAdd.length !== 0 && songsDuplicated.length !== 0) {
      message = `${songsToAdd.length}곡을 재생목록에 담았습니다. (${songsDuplicated.length}곡은 이미 존재합니다.)`
    } else {
      message = `${songsToAdd.length}곡을 재생목록에 담았습니다.`
    } 
    showMessageBox(message, 1500);
    if(playAfterAdd){
      const songToPlay = songsArray[songsArray.length - 1];
      setPlayerSource(songToPlay.src, songToPlay.albumImageSrc, 0);
    }
    return songsArray.length;
  },[dispatch, setPlayerSource, showMessageBox, currentPlaylist])

  const removeFromCurrentPlaylist = React.useCallback(() => {
    console.log('### makes new removeFromCurrentPlaylist');
    dispatch(removeChecked());
  },[dispatch]);
  
  const toggleCurrentPlayList = React.useCallback(() => {
    dispatch(toggleAllChecked());
  },[dispatch]);

  const playNextSong = React.useCallback(() => {
    const currentSongIndex = currentPlaylist.findIndex(song => song.src === currentSrc);
    const nextSongIndex = currentSongIndex === currentPlaylist.length -1 ? 0 : currentSongIndex + 1;
    const nextSong = currentPlaylist[nextSongIndex]
    setPlayerSource(nextSong.src, nextSong.albumImageSrc, nextSongIndex);
  },[currentSrc, currentPlaylist, setPlayerSource])

  const playPrevSong = React.useCallback(() => {
    const currentSongIndex = currentPlaylist.findIndex(song => song.src === currentSrc);
    const prevSongIndex = currentSongIndex === 0 ? currentPlaylist.length -1 : currentSongIndex - 1;
    const prevSong = currentPlaylist[prevSongIndex]
    setPlayerSource(prevSong.src, prevSong.albumImageSrc, prevSongIndex);
  },[currentSrc, currentPlaylist, setPlayerSource])
  
  const checkedCount = React.useMemo(() => {
    return currentPlaylist.reduce((acct, song) => {
      if(song.checkedPlaylist){
        return acct + 1;
      }
      return acct;
    },0)
  },[currentPlaylist])

  const checkedSongList = React.useMemo(()=>{
    return currentPlaylist.filter(song => song.checkedPlaylist);
  },[currentPlaylist])

  return {
    currentPlaylist, 
    checkedSongList,
    checkedCount, 
    // addSongToCurrentPlaylist, 
    addSongsToCurrentPlaylist,
    removeFromCurrentPlaylist, 
    toggleCurrentPlayList, 
    playNextSong,
    playPrevSong,
    allChecked
  }
}

export default useCurrentPlaylist;