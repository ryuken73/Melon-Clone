import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrent} from 'Components/AudioPlayer/audioPlayerSlice'

function useAudioPlayer() {
  const src = useSelector((state) => state.audioPlayer.currentSrc);
  const image = useSelector((state) => state.audioPlayer.currentAlbumImage);
  const dispatch = useDispatch();
  const setPlayerSource = React.useCallback((src, image, id) => {
    dispatch(setCurrent({src, image, id}))
  },[dispatch]);
  return {src, image, setPlayerSource};
}

export default useAudioPlayer;