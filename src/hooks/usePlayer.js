import React from 'react';
import Hls from 'hls.js';
import {secondsToTime} from 'lib/util';

export default function usePlayer(hlsSource, audioElementRef) {
    const [manifestLoaded, setManifestLoaded] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    // const audioElementRef = React.useRef(null);
    const hlsRef = React.useRef(null);
    React.useEffect(()=>{
        console.log('### hlsSource changed!:', hlsSource);
        const handleLoadedMetadata = event => {
            console.log('in usePlayer: loadedMetadata')
            const durationSec = parseInt(audioElementRef.current.duration);
            setDuration(secondsToTime(durationSec))
            audioElementRef.current.play();
        }
        if(hlsSource === ''){
            console.error('hlsSource is null. just return')
            return;
        }
        // remove previous Audio and Hls instance 
        if(audioElementRef.current !== null){
            setManifestLoaded(false);
            audioElementRef.current = null;
        }
        if(hlsRef && hlsRef.current !== null){
            setManifestLoaded(false);
            hlsRef.current.destroy();
        }
        //
        // create new Audio and Hls instance, then load source.
        if(Hls.isSupported()){
            console.log('!! create audio Element', hlsRef)
            audioElementRef.current = new Audio();
            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(audioElementRef.current);
            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                hlsRef.current.loadSource(hlsSource);
                audioElementRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            })
            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setManifestLoaded(true)
            })
        }

        return (() => {
            audioElementRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        })
    },[hlsSource, audioElementRef]);

    // return [audioElementRef, manifestLoaded, duration];
    return [manifestLoaded, duration];
}
