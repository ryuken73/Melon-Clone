import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {pushObjectToState, pushSongsToCurrentlist, removeChecked, toggleAllChecked} from 'Components/PlayList/playlistSlice';
import usePlayerState from './usePlayerState';
import useMessageBox from './useMessageBox';

function useCurrentPlaylist() {
  const {showMessageBox} = useMessageBox();
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  const allChecked = React.useMemo(() => {
    return currentPlaylist.length === 0 ? false : currentPlaylist.every(song => song.checkedPlaylist)
  },[currentPlaylist])
  // console.log('#### useCurrentPlaylist:', allChecked);
  const {src:currentSrc, setPlayerSource} = usePlayerState();
  const dispatch = useDispatch();

  // const addSongToCurrentPlaylist = React.useCallback((song, playAfeterAdd) => {
  //   // to add to state, song should be converted to serializable(to song.parsedWithoutBTag)
  //   console.log('### makes new addSongToCurrentPlaylist');
  //   const songParsed = song.parsedWithoutBTag || song;
  //   const songWithChecked = {...songParsed, checkedPlaylist: false, currentPlaying: false};
  //   dispatch(pushObjectToState({stateKey:'currentPlaylist', value: songWithChecked}))
  //   playAfeterAdd && setPlayerSource(song.src, song.albumImageSrc, 0);
  //   return 1;
  // },[dispatch, setPlayerSource])

  const addSongsToCurrentPlaylist = React.useCallback((songsToAdd, playAfterAdd) => {
    console.log('### add songs batch: ', songsToAdd);
    const songs = Array.isArray(songsToAdd) ? songsToAdd: [songsToAdd];
    const songsParsed = songs.map(song => {
      const songWithoutBTag = song.parsedWithoutBTag || song;
      return {
        ...songWithoutBTag  ,
        checkedPlaylist: false,
        currentPlaying: false
      }   
    });
    dispatch(pushSongsToCurrentlist({songsParsed}));
    const message = `${songs.length}곡을 재생목록에 담았습니다.`
    showMessageBox(message, 1500);
    if(playAfterAdd){
      const songToPlay = songs[songs.length - 1];
      setPlayerSource(songToPlay.src, songToPlay.albumImageSrc, 0);
    }
    return songs.length;
  },[dispatch, setPlayerSource])

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

  return {
    currentPlaylist, 
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