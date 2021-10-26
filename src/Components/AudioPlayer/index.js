import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from '../Common/ImageBox';
import TextBox from '../Common/TextBox';
import ProgressBar from '../Common/ProgressBar';
import SliderBar from '../Common/SliderBar';
import PlayerControls from './PlayerControls';
import colors from '../../config/colors';
import { ColorizeSharp } from '@mui/icons-material';
import Hls from 'hls.js';
import useHlsAudioPlayer from '../../hooks/useHlsAudioPlayer';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 350px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Image = styled(Box)`
    margin-top: 20px;
`;
const Title = styled(Box)`
    margin-top: 10px;
    align-self: center;
`;
const Artist = styled(Box)`
    align-self: center;
    margin-top: 5px;
`;
const Progress = styled(Box)`
    margin-left: 20px;
    margin-right: 20px;
`;
const Duration = styled(Box)`
    margin-left: 20px;
    display: flex;
`;
const Controls = styled(Box)`
    margin-top: auto;
`;



const eventHandlers = {
    'abort': 'onAbort',
    'canplay': 'onCanPlay',
    'canplaythrough': 'onCanPlayThrough',
    'durationchange': 'onDurationChange',
    'progress': 'onProgress',
    'timeupdate': 'onTimeUpdate',
    'pause': 'onPause',
    'play': 'onPlay',
    'seeked': 'onSeeked',
    'error': 'onError',
    'ended': 'onEnded'

}

const hlsSource = 'http://10.11.31.51:1935/music/_definst_/mp3:Audio_WAVE1/4MB/4MB029154/4MB029154_Track01.mp3/playlist.m3u8'

const AudioPlayer = props => {
    const [currentEvent, setCurrentEvent] = React.useState(null);
    const [playerRef, hls, canPlay] = useHlsAudioPlayer(hlsSource);

    const playerDefaultEventHandler = React.useCallback(event => {
        console.log(`event on:`,event.type, event.target.src)
        setCurrentEvent(event.type)
    },[]);

    React.useEffect(()=>{
        if(playerRef.current === null) return;
        Object.keys(eventHandlers).forEach(eventType => {
            playerRef.current.addEventListener(eventType, props[eventHandlers[eventType]]||playerDefaultEventHandler)
        })
    },[playerRef.current, eventHandlers])

    return (
        <Container>
            <Image>
                <ImageBox width="150px" height="150px"></ImageBox>
            </Image>
            <Title>
                <TextBox textalign="center" fontSize="13px" text="곡명" color={colors.textMain}></TextBox>
            </Title>
            <Artist>
                <TextBox textalign="center" text="아티스트"></TextBox>
            </Artist>
            <Progress>
                <SliderBar />
            </Progress>
            <Duration>
                <TextBox fontSize="11px" text="00:01" color={colors.textMain}></TextBox>
                <TextBox fontSize="11px" text="03:01" marginLeft="5px" color={colors.textSub}></TextBox>
            </Duration>
            <Controls>
                <PlayerControls playerRef={playerRef} canPlay={canPlay} currentEvent={currentEvent}></PlayerControls>
            </Controls>
        </Container>
    )
}

export default React.memo(AudioPlayer);
