import React from 'react';
import {secondsToTime} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentPlayingByIndex} from 'Components/PlayList/playlistSlice';

export default function usePlayerEvent(manifestLoaded, playerRef) {
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.audioPlayer.currentIndex);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [progress, setProgress] = React.useState(0);
    const player = playerRef.current;

    const handlePlaying = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePlaying')
        setIsPlaying(true);
        dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: true}));
    },[dispatch, currentIndex])

    const handlePause = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePause')
        setIsPlaying(false);
        dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: false}));
    },[dispatch, currentIndex])

    const handleTimeupdate = React.useCallback(()=>{
        console.log('$$$$ :', player)
        const currentTime = secondsToTime(parseInt(player.currentTime));
        setCurrentTime(currentTime)
        const progress = ((player.currentTime/player.duration) * 100).toFixed(0);
        setProgress(progress)
    },[player])

    const onClickPlay = React.useCallback(() => {
        if(isPlaying) {
            player.pause();
            return
        }
        player.play();
    },[player, isPlaying])

    React.useEffect(() => {
        if(manifestLoaded === false) return [];
        if(player === null || player === undefined) {
            setIsPlaying(false);
            return [];
        }
        console.log('attach player event handlers');
        player.addEventListener('playing', handlePlaying)
        player.addEventListener('pause', handlePause)
        player.addEventListener('timeupdate', handleTimeupdate)

        return (() => {
            player.removeEventListener('playing', handlePlaying)
            player.removeEventListener('pause', handlePause)
            player.removeEventListener('timeupdate', handleTimeupdate)
        })

    },[manifestLoaded, player, handlePlaying, handlePause, handleTimeupdate])

    return {isPlaying, progress, currentTime, duration, onClickPlay}
}
