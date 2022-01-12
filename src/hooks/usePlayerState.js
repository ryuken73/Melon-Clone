import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrent} from 'Components/AudioPlayer/audioPlayerSlice';
import CONSTANTS from 'config/constants';
const {SRC_TYPE} = CONSTANTS;
const isSourceAudio = src_type => src_type === SRC_TYPE.SONG || src_type === SRC_TYPE.POT_CAST;

function usePlayerState() {
  const src = useSelector((state) => state.audioPlayer.currentSrc);
  const image = useSelector((state) => state.audioPlayer.currentAlbumImage);
  const currentPlaylist = useSelector(state => state.playlist.currentPlaylist);
  const song = currentPlaylist.find(song => song.src === src);
  const src_type = song?.src_type;
  const dispatch = useDispatch();
  const setPlayerSource = React.useCallback((src, image, index, srcObj) => {
    // console.log('&&&&& setPlayerSource', srcObj);
    const {src_type='hls'} = srcObj;
    if(isSourceAudio(src_type) && document.pictureInPictureElement){
        document.exitPictureInPicture();
    }
    dispatch(setCurrent({src, image, index}))
  },[dispatch]);
  return {src, src_type, image, setPlayerSource, song};
}

export default usePlayerState;