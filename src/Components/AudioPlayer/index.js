import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from '../Common/ImageBox';
import TextBox from '../Common/TextBox';
import SliderBar from '../Common/SliderBar';
import PlayerControls from './PlayerControls';
import colors from '../../config/colors';
import useHlsAudioPlayer from '../../hooks/useHlsAudioPlayer';
import useEventEmitter from '../../hooks/useEventEmitter';

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

const hlsSource = 'http://10.11.31.51:1935/music/_definst_/mp3:Audio_WAVE1/4MB/4MB029154/4MB029154_Track01.mp3/playlist.m3u8'

const durationToSeconds = duration => {
    const [minutes, seconds] = duration.split(':');
    return minutes * 60 + seconds;
}

const AudioPlayer = props => {
    const [playerRef, hls, manifestLoaded, event] = useHlsAudioPlayer(hlsSource);
    const [isPlaying, duration, currentTime, progress] = useEventEmitter(playerRef, event);
    console.log('duration changed:',duration)
    const handleMoveProgressSlider = React.useCallback(progressPercent => {
        const player = playerRef.current;
        const {duration} = player;
        if(duration === undefined || duration === null) return;
        const timeToGo = (duration * progressPercent/100);
        console.log(duration, timeToGo)
        player.currentTime = timeToGo;
    },[duration]);

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
                <SliderBar value={progress} onChange={handleMoveProgressSlider} />
            </Progress>
            <Duration>
                <TextBox fontSize="11px" text={currentTime} color={colors.textMain}></TextBox>
                <TextBox fontSize="11px" text={duration} marginLeft="5px" color={colors.textSub}></TextBox>
            </Duration>
            <Controls>
                <PlayerControls playerRef={playerRef} canPlay={manifestLoaded} isPlaying={isPlaying}></PlayerControls>
            </Controls>
        </Container>
    )
}

export default React.memo(AudioPlayer);
