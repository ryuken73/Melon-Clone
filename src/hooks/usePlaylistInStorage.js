import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import useAppState from './useAppState';
import {setCurrentPlayList} from 'Components/PlayList/playlistSlice';

function usePlaylistInStorage() {
  const {loginId} = useAppState();
  const key = `MBK-PLAYLIST-${loginId}`;
  const initialValue = [];
  const [storedValue, setValue] = useLocalStorage(key, initialValue);
  const currentPlaylist = useSelector(state => state.playlist.currentPlaylist);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // load saved currentPlaylist
    const playingMarkRemoved = storedValue.map(song => {
      song.currentPlaying = false
      return song
    });
    dispatch(setCurrentPlayList({currentPlaylist: playingMarkRemoved}));
    // console.log('^^^^',storedValue)
    // dispatch(setCurrentPlayList({currentPlaylist: storedValue}));

  },[dispatch])

  React.useEffect(() => {
    // save currentPlaylist to localStorage
    setValue(currentPlaylist)
  },[currentPlaylist, setValue])

}

export default usePlaylistInStorage;