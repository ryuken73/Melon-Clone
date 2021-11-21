import {useSelector, useDispatch} from 'react-redux';
import {pushObjectToState, removeChecked, toggleAllChecked} from 'Components/PlayList/playlistSlice';
import useAudioPlayer from './useAudioPlayer';

function useCurrentPlaylist() {
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  const allChecked = currentPlaylist.length === 0 ? false : currentPlaylist.every(song => song.checkedPlaylist)
  console.log('#### useCurrentPlaylist:', allChecked);
  const {setPlayerSource} = useAudioPlayer();
  const dispatch = useDispatch();

  const addSongToCurrentPlaylist = song => {
    // values in state should be serializable: use song.parsed
    dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song.parsed}))
  }

  const addSongToCurrentPlaylistNPlay = song => {
    // values in state should be serializable: use song.parsed
    dispatch(pushObjectToState({stateKey:'currentPlaylist', value: song.parsed}));
    setPlayerSource(song.src, song.albumImageSrc, 0);
  }

  const removeFromCurrentPlaylist = () => {
    dispatch(removeChecked());
  }
  
  const toggleCurrentPlayList = () => {
    dispatch(toggleAllChecked());
  }
  
  const checkedCount = currentPlaylist.reduce((acct, song) => {
    if(song.checkedPlaylist){
      return acct + 1;
    }
    return acct;
  },0)

  return {
    currentPlaylist, 
    checkedCount, 
    addSongToCurrentPlaylist, 
    addSongToCurrentPlaylistNPlay, 
    removeFromCurrentPlaylist, 
    toggleCurrentPlayList, 
    allChecked
  }
}

export default useCurrentPlaylist;