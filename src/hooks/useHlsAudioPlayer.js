import React from 'react';
import Hls from 'hls.js';

const mediaEvents = [
    'abort',
    'canplay',
    'canplaythrough',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate', // too many state change
    'volumechange',
    'waiting'
]

export default function useHlsAudioPlayer(hlsSource) {
    const [hls, setHls] = React.useState(null);
    const [manifestLoaded, setManifestLoaded] = React.useState(false);
    const [event, setEvent] = React.useState(null);
    let playerRef = React.useRef(null);
    React.useEffect(()=>{
        if(Hls.isSupported()){
            const audioElement = new Audio();
            const hls = new Hls();
            hls.attachMedia(audioElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                playerRef.current = audioElement;
                setHls(hls);
                hls.loadSource(hlsSource);
                mediaEvents.forEach(eventType => {
                    playerRef.current.addEventListener(eventType, setEvent)
                })
            })
            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setManifestLoaded(true)
            })
        }
        return (() => {
            mediaEvents.forEach(eventType => {
                playerRef.current.removeEventListener(eventType, setEvent)
            })
        })
    },[]);
    React.useEffect(()=>{
        if(hls !== null){
                hls.loadSource(hlsSource);
        }
    },[hls, hlsSource]);

    return [playerRef, hls, manifestLoaded, event];
}
