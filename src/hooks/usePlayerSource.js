import React from 'react';
import Hls from 'hls.js';
import {secondsToTime} from 'lib/util';

export default function usePlayer(src, mediaElementRef, src_type) {
    // console.log('&&',src_type)
    const [manifestLoaded, setManifestLoaded] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    // const mediaElementRef = React.useRef(null);
    const hlsRef = React.useRef(null);
    React.useEffect(()=>{
        console.log('### src changed!:', src);

        //initialize manifestLoaded to false for playing HLS
        setManifestLoaded(false);

        const handleLoadedMetadata = event => {
            console.log('in usePlayer: loadedMetadata', mediaElementRef.current.duration)
            if(!isNaN(mediaElementRef.current.duration)){
                const durationSec = parseInt(mediaElementRef.current.duration);
                setDuration(secondsToTime(durationSec))
                mediaElementRef.current.play();
            }
        }

        // fast return if src not ready or mediaElement is null
        if(src === ''){
            return;
        }
        if(mediaElementRef === undefined || mediaElementRef.current === null){
            return;
        }
        if(hlsRef && hlsRef.current !== null){
            hlsRef.current.destroy();
        }
        //
        if(src_type === 'hls' && Hls.isSupported()){
            console.log('!! attach mediaElement(audio) to hlsRef')
            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(mediaElementRef.current);
            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                hlsRef.current.loadSource(src);
                mediaElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            })
            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setManifestLoaded(true)
            })
        }

        if(src_type === 'mp3' || src_type === 'mp4') {
            console.log('!! attach loadedmetadata event handler to media element(not hls) and set media source');
            mediaElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            mediaElementRef.current.src = src;
            setManifestLoaded(true);
        }

        return (() => {
            if(mediaElementRef.current){
                mediaElementRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
            }
        })
    },[src, src_type, mediaElementRef]);

    // return [mediaElementRef, manifestLoaded, duration];
    return [manifestLoaded, duration];
}
