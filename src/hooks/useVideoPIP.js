import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import useMessageBox from 'hooks/useMessageBox'
import CONSTANTS from 'config/constants';

const {SRC_TYPE} = CONSTANTS;

export default function usePIP() {
    const srcType = useSelector(state => state.audioPlayer.currentSrcType);
    const {hideRightPane} = useMediaQueryEasy();
    const {showMessageBox} = useMessageBox();
    const showPIP = React.useCallback( mediaElementRef => {
        // if(mediaElementRef.current.readyState && mediaElementRef.current.readyState === 0) return;
        if(srcType === SRC_TYPE.BORA && hideRightPane){
            if(!document.pictureInPictureElement){
                try {
                    if(mediaElementRef.current === null) return;
                    mediaElementRef.current.requestPictureInPicture()
                    .catch(err => {
                        console.error(err);
                        showMessageBox('PIP Player Loading Error(temporary)', 1000, 'error')
                    })
                } catch (err) {
                    console.error(err)
                }
            }
       }
    }, [srcType, hideRightPane])
    return {showPIP}
}