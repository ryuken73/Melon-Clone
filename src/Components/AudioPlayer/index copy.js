import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import SliderBar from 'Components/Common/SliderBar';
import PlayerControls from './PlayerControls';
import colors from 'config/colors';
import useHlsAudioPlayer from 'hooks/useHlsAudioPlayer';
import useHlsPlayerEvent from 'hooks/useHlsPlayerEvent';
import useAudioPlayer from 'hooks/useAudioPlayer';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 320px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Image = styled(Box)`
    margin-top: 20px;
`;
const Title = styled(Box)`
    margin-top: 10px;
    align-self: center;
    max-width: 200px;
`;
const Artist = styled(Box)`
    align-self: center;
    margin-top: 5px;
    max-width: 200px;
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
    const {src:hlsSrc, image:imageSrc, song={}} = useAudioPlayer();
    const [playerRef, manifestLoaded, isPlaying, duration, currentTime, progress] = useHlsAudioPlayer(hlsSrc);
    // const [isPlaying, duration, currentTime, progress] = useHlsPlayerEvent(playerRef, event);
    console.log('!! audio player:', duration, currentTime, progress)
    const {
        song_name="곡명",
        artist="아티스트"
    } = song;
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
                <ImageBox src={imageSrc} width="150px" height="150px"></ImageBox>
            </Image>
            <Title>
                <TextBox textalign="center" fontSize="13px" text={song_name} color={colors.textMain}></TextBox>
            </Title>
            <Artist>
                <TextBox textalign="center" text={artist}></TextBox>
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
