import React from 'react';
import {secondsToTime} from 'lib/util';

export default function useEventEmitter(playerRef, event) {
    const [isPlayinng, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [progress, setProgress] = React.useState(0);
    const player = playerRef.current;
    React.useEffect(()=>{
        if(player===null) {
            setIsPlaying(false);
            return
        }
        if(event===null) return;
        if(player.currentTime > 0 && !player.paused && !player.ended){
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
        if(event.type === 'loadedmetadata'){
            const durationSec = parseInt(playerRef.current.duration);
            setDuration(secondsToTime(durationSec));
            return;
        }
        if(event.type === 'timeupdate'){
            const currentTime = parseInt(playerRef.current.currentTime);
            setCurrentTime(secondsToTime(currentTime))
            const progress = (playerRef.current.currentTime/playerRef.current.duration) * 100;
            setProgress(progress)
            return;
        }
    },[event, player]);

    return [isPlayinng, duration, currentTime, progress];
}
