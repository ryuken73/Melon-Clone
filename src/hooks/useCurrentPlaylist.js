import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {pushObjectToState, removeChecked, toggleAllChecked} from 'Components/PlayList/playlistSlice';
import useAudioPlayer from './useAudioPlayer';

function useCurrentPlaylist() {
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  const allChecked = React.useMemo(() => {
    return currentPlaylist.length === 0 ? false : currentPlaylist.every(song => song.checkedPlaylist)
  },[currentPlaylist])
  console.log('#### useCurrentPlaylist:', allChecked);
  const {setPlayerSource} = useAudioPlayer();
  const dispatch = useDispatch();

  const addSongToCurrentPlaylist = React.useCallback((song, playAfeterAdd) => {
    // to add to state, song should be converted to serializable(to song.parsedWithoutBTag)
    console.log('### makes new addSongToCurrentPlaylist');
    const songParsed = song.parsedWithoutBTag || song;
    const songWithChecked = {...songParsed, checkedPlaylist: false, currentPlaying: false};
    dispatch(pushObjectToState({stateKey:'currentPlaylist', value: songWithChecked}))
    playAfeterAdd && setPlayerSource(song.src, song.albumImageSrc, 0);
  },[dispatch, setPlayerSource])

  const removeFromCurrentPlaylist = React.useCallback(() => {
    console.log('### makes new removeFromCurrentPlaylist');
    dispatch(removeChecked());
  },[dispatch]);
  
  const toggleCurrentPlayList = React.useCallback(() => {
    dispatch(toggleAllChecked());
  },[dispatch]);
  
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
    addSongToCurrentPlaylist, 
    removeFromCurrentPlaylist, 
    toggleCurrentPlayList, 
    allChecked
  }
}

export default useCurrentPlaylist;