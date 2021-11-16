import React from 'react';
import {secondsToTime} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentPlayingByIndex} from 'Components/PlayList/playlistSlice';

export default function useEventEmitter(playerRef, event) {
    const currentId = useSelector(state => state.audioPlayer.currentId);
    const currentIndex = useSelector(state => state.audioPlayer.currentIndex);
    const dispatch = useDispatch();
    const [isPlayinng, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [progress, setProgress] = React.useState(0);
    const player = playerRef.current;
    React.useEffect(()=>{
        if(player === null){
            setIsPlaying(false);
            return;
        }
        //console.log('!! emit event of player:', event, player)
        if(event===null) return;
        if(player.currentTime > 0 && !player.paused && !player.ended){
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
        if(event.type === 'loadedmetadata'){
            const durationSec = parseInt(playerRef.current.duration);
            setDuration(secondsToTime(durationSec));
            playerRef.current.play();
            return;
        }
        if(event.type === 'playing'){
            console.log('** audio now playing')
            dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: true}));
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
