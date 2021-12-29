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
    const [manifestLoaded, setManifestLoaded] = React.useState(false);
    const [event, setEvent] = React.useState(null);
    const audioElementRef = React.useRef(null);
    const hlsRef = React.useRef(null);
    React.useEffect(()=>{
        console.log('### hlsSource changed!:', hlsSource);
        if(hlsSource === ''){
            console.error('hlsSource is null. just return')
            return;
        }
        // remove previous Audio and Hls instance 
        if(audioElementRef.current !== null){
             mediaEvents.forEach(eventType => {
                audioElementRef.current.removeEventListener(eventType, setEvent)
            })
            audioElementRef.current = null;
        }
        console.log('!! ref:', hlsRef.curret);
        if(hlsRef.current !== null){
            hlsRef.current.destroy();
        }
        //
        // create new Audio and Hls instance, then load source.
        if(Hls.isSupported()){
            console.log('!! create audio Element')
            audioElementRef.current = new Audio();
            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(audioElementRef.current);
            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                hlsRef.current.loadSource(hlsSource);
                console.log('!! attach event to player', audioElementRef)
                mediaEvents.forEach(eventType => {
                    audioElementRef.current.addEventListener(eventType, setEvent)
                })
            })
            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setManifestLoaded(true)
            })
        }
        return (() => {
            mediaEvents.forEach(eventType => {
                audioElementRef.current.removeEventListener(eventType, setEvent)
            })
        })
    },[hlsSource]);

    return [audioElementRef, manifestLoaded, event];
}
