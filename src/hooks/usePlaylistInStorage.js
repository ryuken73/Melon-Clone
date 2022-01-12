import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import {setCurrentPlayList} from 'Components/PlayList/playlistSlice';

function usePlaylistInStorage() {
  const key = 'MBK-PLAYLIST';
  const initialValue = [];
  const [storedValue, setValue] = useLocalStorage(key, initialValue);
  const currentPlaylist = useSelector(state => state.playlist.currentPlaylist);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setCurrentPlayList({currentPlaylist: storedValue}));
  },[dispatch])

  React.useEffect(() => {
    console.log('*****',currentPlaylist)
    setValue(currentPlaylist)
  },[currentPlaylist, setValue])

}

export default usePlaylistInStorage;