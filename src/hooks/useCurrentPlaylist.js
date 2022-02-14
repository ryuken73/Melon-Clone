import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  pushObjectToState, 
  pushSongsToCurrentlist, 
  removeChecked, 
  toggleAllChecked, 
  clearChecked,
  setCurrentPlayList,
  setSongChecked,
  setSongLastChecked,
  setSongCheckedBetween,
  hasSong
} from 'Components/PlayList/playlistSlice';
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
    let message, level;
    if(songsToAdd.length === 0 && songsDuplicated.length !== 0){
      message = `${songsDuplicated.length}곡이 이미 재생목록에 존재 합니다.`
      level = 'error';
    } else if(songsToAdd.length !== 0 && songsDuplicated.length !== 0) {
      message = `${songsToAdd.length}곡을 재생목록에 담았습니다. (${songsDuplicated.length}곡은 이미 존재합니다.)`
      level = 'error'
    } else {
      message = `${songsToAdd.length}곡을 재생목록에 담았습니다.`
      level = 'success'
    } 
    showMessageBox(message, 2000, level);
    if(playAfterAdd){
      // const songToPlay = songsArray[songsArray.length - 1];
      const songToPlay = songsArray[0];
      level === 'success' && setPlayerSource(songToPlay.src, songToPlay.albumImageSrc, 0, songToPlay);
      if(level === 'error'){
        const alreadySongIndex = currentPlaylist.findIndex(song => song.id === songToPlay.id)
        setPlayerSource(songToPlay.src, songToPlay.albumImageSrc, alreadySongIndex, songToPlay);
      }
    }
    return songsArray.length;
  },[dispatch, setPlayerSource, showMessageBox, currentPlaylist])

  const removeFromCurrentPlaylist = React.useCallback(() => {
    console.log('### exit pip otherwise player window remains and act up!');
    if(document.pictureInPictureElement){
        document.exitPictureInPicture();
    }
    dispatch(removeChecked());
  },[dispatch]);
  
  const toggleCurrentPlayList = React.useCallback(() => {
    dispatch(toggleAllChecked());
  },[dispatch]);

  const clearCheckedCurrentPlayList = React.useCallback(() => {
    dispatch(clearChecked());
  },[dispatch]);

  const playNextSong = React.useCallback(() => {
    if(currentPlaylist.length < 2) return;
    const currentSongIndex = currentPlaylist.findIndex(song => song.src === currentSrc);
    const nextSongIndex = currentSongIndex === currentPlaylist.length -1 ? 0 : currentSongIndex + 1;
    const nextSong = currentPlaylist[nextSongIndex]
    setPlayerSource(nextSong.src, nextSong.albumImageSrc, nextSongIndex, nextSong);
  },[currentSrc, currentPlaylist, setPlayerSource])

  const playPrevSong = React.useCallback(() => {
    if(currentPlaylist.length < 2) return;
    const currentSongIndex = currentPlaylist.findIndex(song => song.src === currentSrc);
    const prevSongIndex = currentSongIndex === 0 ? currentPlaylist.length -1 : currentSongIndex - 1;
    const prevSong = currentPlaylist[prevSongIndex]
    setPlayerSource(prevSong.src, prevSong.albumImageSrc, prevSongIndex, prevSong);
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

  const currentPlaylistIndex = React.useMemo(() => {
    return currentPlaylist.findIndex(song => song.src === currentSrc);
  },[currentPlaylist, currentSrc])

  const setCurrentPlaylist = React.useCallback(currentPlaylist => {
    dispatch(setCurrentPlayList({currentPlaylist}));
  }, [dispatch])

  const setChecked = React.useCallback((id, checked) => {
    console.log(id, checked)
    dispatch(setSongChecked({id, checked}))
  },[dispatch])

  const setLastChecked = React.useCallback((id, checked) => {
    dispatch(setSongLastChecked({id}))
  },[dispatch])

  const setCheckedFromLastToThis = React.useCallback((id) => {
    const lastCheckedIndex = currentPlaylist.findIndex(song => song.lastChecked)
    if(lastCheckedIndex === undefined) return;
    const thisIndex = currentPlaylist.findIndex(song => song.id === id);
    const valueToSet = currentPlaylist[lastCheckedIndex].checkedPlaylist;
    const fromIndex = thisIndex > lastCheckedIndex ? lastCheckedIndex : thisIndex;
    const toIndex = thisIndex > lastCheckedIndex ? thisIndex : lastCheckedIndex;
    dispatch(setSongCheckedBetween({fromIndex, toIndex, checked: valueToSet}));
  },[dispatch, currentPlaylist])

  return {
    currentPlaylist, 
    checkedSongList,
    checkedCount, 
    currentPlaylistIndex,
    // addSongToCurrentPlaylist, 
    setCurrentPlaylist,
    addSongsToCurrentPlaylist,
    removeFromCurrentPlaylist, 
    toggleCurrentPlayList, 
    clearCheckedCurrentPlayList,
    playNextSong,
    playPrevSong,
    setChecked,
    setLastChecked,
    setCheckedFromLastToThis,
    allChecked
  }
}

export default useCurrentPlaylist;