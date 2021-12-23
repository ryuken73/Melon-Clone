import React from 'react';
import {secondsToTime} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentPlayingByIndex} from 'Components/PlayList/playlistSlice';
import {setVolume} from 'Components/AudioPlayer/audioPlayerSlice'

export default function usePlayerEvent(manifestLoaded, playerRef) {
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.audioPlayer.currentIndex);
    const volume = useSelector(state => state.audioPlayer.volume);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState("00:00");
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [progress, setProgress] = React.useState(0);
    const [muted, setMuted] = React.useState(false);
    const player = playerRef.current;

    const handlePlaying = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePlaying')
        setIsPlaying(true);
        dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: true}));
        if(player !== null) player.volume = volume;
    },[dispatch, player, volume, currentIndex])

    const handlePause = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePause')
        setIsPlaying(false);
        dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: false}));
    },[dispatch, currentIndex])

    const handleTimeupdate = React.useCallback(()=>{
        const currentTime = secondsToTime(parseInt(player.currentTime));
        setCurrentTime(currentTime)
        const progress = ((player.currentTime/player.duration) * 100).toFixed(0);
        setProgress(progress)
    },[player])

    const handleVolumeControl = React.useCallback(volume=>{
        dispatch(setVolume({volume}))
        if(player !== null) player.volume = volume;
    },[dispatch, player])

    const onClickPlay = React.useCallback(() => {
        if(isPlaying) {
            player.pause();
            return
        }
        player.play();
    },[player, isPlaying])

    const onClickReplay10 = React.useCallback(()=>{
        const {currentTime} = player;
        const replayTime = currentTime - 10 > 0 ? currentTime - 10 : 0;
        playerRef.current.currentTime = replayTime;
        const replayTimeToSeconds = secondsToTime(replayTime);
        setCurrentTime(replayTimeToSeconds)
        const progress = ((replayTime/player.duration) * 100).toFixed(0);
        setProgress(progress)
    },[player, playerRef])

    const onClickForward10 = React.useCallback(()=>{
        const {currentTime} = player;
        const forwardTime = currentTime + 10 < player.duration ? currentTime + 10 : duration;
        playerRef.current.currentTime = forwardTime;
        const forwardTimeToSeconds = secondsToTime(forwardTime);
        setCurrentTime(forwardTimeToSeconds)
        const progress = ((forwardTime/player.duration) * 100).toFixed(0);
        setProgress(progress)
    },[player, playerRef, duration])

    const toggleMute = React.useCallback(() => {
        setMuted(muted => {
            const player = playerRef.current;
            const toggled = !muted;
            if(player) {
                player.muted = toggled;
                // dispatch(setVolume({volume: player.volume}))
                return toggled;
            }
            return muted;
        })
    },[setMuted, dispatch, playerRef])

    React.useEffect(() => {
        if(manifestLoaded === false) return [];
        if(player === null || player === undefined) {
            setIsPlaying(false);
            return [];
        }
        console.log('attach player event handlers');
        player.muted = muted;
        player.addEventListener('playing', handlePlaying)
        player.addEventListener('pause', handlePause)
        player.addEventListener('timeupdate', handleTimeupdate)

        return (() => {
            player.removeEventListener('playing', handlePlaying)
            player.removeEventListener('pause', handlePause)
            player.removeEventListener('timeupdate', handleTimeupdate)
        })

    },[manifestLoaded, player, muted, handlePlaying, handlePause, handleTimeupdate])

    return {
        muted,
        isPlaying, 
        progress, 
        currentTime, 
        duration, 
        volume,
        onClickPlay, 
        onClickReplay10,
        onClickForward10,
        handleVolumeControl,
        toggleMute
    }
}
