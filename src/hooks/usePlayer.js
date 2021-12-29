import React from 'react';
import Hls from 'hls.js';
import {secondsToTime} from 'lib/util';

export default function usePlayer(src, audioElementRef, src_type) {
    console.log('&&',src_type)
    const [manifestLoaded, setManifestLoaded] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    // const audioElementRef = React.useRef(null);
    const hlsRef = React.useRef(null);
    React.useEffect(()=>{
        console.log('### src changed!:', src);
        const handleLoadedMetadata = event => {
            console.log('in usePlayer: loadedMetadata', audioElementRef.current.duration)
            if(!isNaN(audioElementRef.current.duration)){
                const durationSec = parseInt(audioElementRef.current.duration);
                setDuration(secondsToTime(durationSec))
                audioElementRef.current.play();
            }
        }
        if(src === ''){
            console.error('src is null. just return')
            return;
        }
        // remove previous Audio and Hls instance 
        if(audioElementRef.current !== null){
            console.log('usePlayer: nullify audioElement', audioElementRef)
            setManifestLoaded(false);
            audioElementRef.current.pause();
            audioElementRef.current = null;
        }
        if(hlsRef && hlsRef.current !== null){
            setManifestLoaded(false);
            hlsRef.current.destroy();
        }
        //
        // create new Audio and Hls instance, then load source.
        if(src_type === 'hls' && Hls.isSupported()){
            console.log('!! create audio Element', hlsRef)
            audioElementRef.current = new Audio();
            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(audioElementRef.current);
            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                hlsRef.current.loadSource(src);
                audioElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            })
            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setManifestLoaded(true)
            })
        }

        if(src_type === 'mp3') {
            console.log('!! create audio Element for mp3');
            audioElementRef.current = new Audio();
            audioElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            audioElementRef.current.src = src;
            setManifestLoaded(true);
        }

        return (() => {
            audioElementRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        })
    },[src, src_type, audioElementRef]);

    // return [audioElementRef, manifestLoaded, duration];
    return [manifestLoaded, duration];
}
