import React from 'react';
import {secondsToTime} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentPlayingByIndex, setCurrentPlayingBySrc} from 'Components/PlayList/playlistSlice';
import {setVolume, setEndedTime, setRepeatMode} from 'Components/AudioPlayer/audioPlayerSlice'
import {setIsPlaying, setCurrentTime, setProgress, setMuted} from 'Components/AudioPlayer/audioPlayerSlice'
import useMessageBox from 'hooks/useMessageBox';
import CONSTANTS from 'config/constants';

const repeatOption = ['none','one','all']
const getNextRepeatOption = (current) => {
    const currentOptionIndex = repeatOption.findIndex(option => option === current);
    if(currentOptionIndex === -1) return repeatOption[0];
    if(currentOptionIndex === repeatOption.length - 1) return repeatOption[0];
    return repeatOption[currentOptionIndex+1]
}

export default function usePlayerEvent(playerRef) {
    const dispatch = useDispatch();
    const {showMessageBox} = useMessageBox();
    const currentSrc = useSelector(state => state.audioPlayer.currentSrc);
    const currentIndex = useSelector(state => state.audioPlayer.currentIndex);
    const endedTime = useSelector(state => state.audioPlayer.endedTime);
    const volume = useSelector(state => state.audioPlayer.volume);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const currentTime = useSelector(state => state.audioPlayer.currentTime);
    const progress = useSelector(state => state.audioPlayer.progress);
    const muted = useSelector(state => state.audioPlayer.muted);
    const manifestLoaded = useSelector(state => state.audioPlayer.manifestLoaded);
    const duration = useSelector(state => state.audioPlayer.duration);
    const repeatMode = useSelector(state => state.audioPlayer.repeatMode);
    // const [isPlaying, setIsPlaying] = React.useState(false);
    // const [currentTime, setCurrentTime] = React.useState("00:00");
    // const [progress, setProgress] = React.useState(0);
    // const [muted, setMuted] = React.useState(false);
    const player = playerRef.current;

    const handlePlaying = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePlaying')
        dispatch(setIsPlaying({isPlaying:true}))
        // dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: true}));
        dispatch(setCurrentPlayingBySrc({src: currentSrc, playing: true}));
        if(player !== null) player.volume = volume;
    },[dispatch, player, volume, currentSrc])

    const handlePause = React.useCallback(()=>{
        console.log('in usePlayerEvent: handlePause')
        dispatch(setIsPlaying({isPlaying:false}))
        // dispatch(setCurrentPlayingByIndex({targetIndex: currentIndex, playing: false}));
        dispatch(setCurrentPlayingBySrc({src: currentSrc, playing: false}));
    },[dispatch, currentSrc])

    const handleTimeupdate = React.useCallback(()=>{
        const currentTime = secondsToTime(parseInt(player.currentTime));
        dispatch(setCurrentTime({currentTime}))
        const progress = ((player.currentTime/player.duration) * 100).toFixed(0);
        dispatch(setProgress({progress}))
    },[dispatch, player])

    const handleEnded = React.useCallback(() => {
        dispatch(setEndedTime({endedTime: Date.now()}));
    },[dispatch])

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
        if(!player) return;
        const {currentTime} = player;
        const replayTime = currentTime - 10 > 0 ? currentTime - 10 : 0;
        if(Number.isNaN(replayTime)) return;
        playerRef.current.currentTime = replayTime;
        const replayTimeToSeconds = secondsToTime(replayTime);
        dispatch(setCurrentTime({currentTime:replayTimeToSeconds}));
        const progress = ((replayTime/player.duration) * 100).toFixed(0);
        dispatch(setProgress({progress}))
    },[dispatch, player, playerRef])

    const onClickForward10 = React.useCallback(()=>{
        if(!player) return;
        const {currentTime} = player;
        const forwardTime = currentTime + 10 < player.duration ? currentTime + 10 : player.duration;
        if(Number.isNaN(forwardTime)) return;
        playerRef.current.currentTime = forwardTime;
        const forwardTimeToSeconds = secondsToTime(forwardTime);
        dispatch(setCurrentTime({currentTime:forwardTimeToSeconds}));
        const progress = ((forwardTime/player.duration) * 100).toFixed(0);
        dispatch(setProgress({progress}))
    },[player, playerRef])

    const toggleMute = React.useCallback(() => {
        const player = playerRef.current;
        const toggled = !muted;
        console.log('^ toggle Mute:', toggled, player)
        if(player){
            player.muted = toggled;
            dispatch(setMuted({muted:toggled}));
        }
    },[muted, dispatch, playerRef])

    const onClickRepeat = React.useCallback(() => {
        const nextMode = getNextRepeatOption(repeatMode);
        nextMode === 'one' && showMessageBox('1개곡을 반복합니다.')
        nextMode === 'all' && showMessageBox('전체곡을 반복합니다.')
        dispatch(setRepeatMode({repeatMode: nextMode}));
    },[dispatch, repeatMode, showMessageBox])

    React.useEffect(() => {
        if(manifestLoaded === false) return [];
        if(player === null || player === undefined) {
            dispatch(setIsPlaying({isPlaying:false}))
            return [];
        }
        console.log('attach player event handlers', player);
        player.muted = muted;
        player.addEventListener('playing', handlePlaying)
        player.addEventListener('pause', handlePause)
        player.addEventListener('timeupdate', handleTimeupdate)
        player.addEventListener('ended', handleEnded)

        return (() => {
            console.log('detach player event handlers', player);
            player.removeEventListener('playing', handlePlaying)
            player.removeEventListener('pause', handlePause)
            player.removeEventListener('timeupdate', handleTimeupdate)
            player.removeEventListener('ended', handleEnded)
            player.pause();
            if(document.pictureInPictureElement){
                document.exitPictureInPicture();
            }
        })

    },[manifestLoaded, player, muted, handlePlaying, handlePause, handleTimeupdate, dispatch, handleEnded])

    return {
        muted,
        isPlaying, 
        progress, 
        currentTime, 
        volume,
        endedTime,
        repeatMode,
        manifestLoaded,
        duration,
        onClickPlay, 
        onClickReplay10,
        onClickForward10,
        onClickRepeat,
        handleVolumeControl,
        toggleMute
    }
}
