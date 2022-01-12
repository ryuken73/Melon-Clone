import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useMediaQueryEasy from './useMediaQueryEasy';
import CONSTANTS from 'config/constants';

const {SRC_TYPE} = CONSTANTS;

export default function usePIP() {
    const srcType = useSelector(state => state.audioPlayer.currentSrcType);
    const {hideRightPane} = useMediaQueryEasy();
    const showPIP = React.useCallback( mediaElementRef => {
        if(srcType === SRC_TYPE.BORA && hideRightPane){
            if(!document.pictureInPictureElement){
                mediaElementRef.current.requestPictureInPicture();
            }
        }
    }, [srcType, hideRightPane])
    return {showPIP}
}