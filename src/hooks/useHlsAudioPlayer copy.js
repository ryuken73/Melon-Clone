import React from 'react';
import Hls from 'hls.js';
import {secondsToTime} from 'lib/util';
import useDebounce from 'hooks/useDebounce';


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
    const player = audioElementRef.current;
    React.useEffect(()=>{
        console.log('### hlsSource changed!:', hlsSource);
        if(hlsSource === ''){
            console.error('hlsSource is null. just return')
            return;
        }
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

    const isPlaying = React.useMemo(() => {
        if(player === null){
            return false;
        }
        if(player.currentTime > 0 && !player.paused && !player.ended){
            return true;
        } else {
            return false;
        }
    },[player, event])

    const duration = React.useMemo(() => {
        if(event === null) return "00:00";
        if(event.type === 'loadedmetadata'){
            const durationSec = parseInt(player.duration);
            player.play();
            return secondsToTime(durationSec);
        }
        return "00:00"
    },[event, player])

    const [currentTime, progress] = React.useMemo(() => {
        if(event === null) return ["00:00", 0];
        if(event.type === 'timeupdate'){
            console.log(player.currentTime, player.duration)
            const currentTime = parseInt(player.currentTime);
            const progress = (player.currentTime/player.duration) * 100;
            console.log(player.currentTime, player.duration, progress)
            return [secondsToTime(currentTime), progress.toFixed(0)]
        }
        return ["00:00", 0];
    },[event, player])

    // return [audioElementRef, manifestLoaded, event];
    return [audioElementRef, manifestLoaded, isPlaying, duration, currentTime, progress];
}
