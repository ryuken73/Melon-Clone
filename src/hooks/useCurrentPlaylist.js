import {useSelector, useDispatch} from 'react-redux';
import {removeChecked, toggleAllChecked} from 'Components/PlayList/playlistSlice';

function useCurrentPlaylist() {
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  const allChecked = currentPlaylist.length === 0 ? false : currentPlaylist.every(song => song.checked)
  console.log('#### useCurrentPlaylist:', allChecked);
  // console.log('#### useCurrentPlaylist:', checked);
  const dispatch = useDispatch();

  const removeFromCurrentPlaylist = () => {
    dispatch(removeChecked());
  }
  
  const toggleCurrentPlayList = () => {
    dispatch(toggleAllChecked());
  }
  
  const checkedCount = currentPlaylist.reduce((acct, song) => {
    // console.log(song.artist, song.checked)
    if(song.checked){
      return acct + 1;
    }
    return acct;
  },0)
  return [currentPlaylist, checkedCount, removeFromCurrentPlaylist, toggleCurrentPlayList, allChecked]
}

export default useCurrentPlaylist;