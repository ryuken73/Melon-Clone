import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TextBox from 'Components/Common/TextBox';
import SliderBar from 'Components/Common/SliderBar';
import VerticalSlider from './VerticalSlider';
import Popover from '@mui/material/Popover';
import HoverButton from '../Common/ButtonHover';
import colors from 'config/colors';
import usePlayerSource from 'hooks/usePlayerSource';
import usePlayerState from 'hooks/usePlayerState';
import usePlayerEvent from 'hooks/usePlayerEvent';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useMessageBox from 'hooks/useMessageBox';

const Container = styled(Box)`
    display: 'flex';
    width: ${props => props.hide && '0px'};
    flex-direction: column;
`
const ProgressContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 50px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Progress = styled(Box)`
    margin-left: 20px;
    margin-right: 20px;
`;
const Duration = styled(Box)`
    margin-left: 20px;
    display: flex;
`;
const ControlContainer = styled(Box)`
    display: flex;
    justify-content: center;
    background: black;
    position: relative;
`
const CustomVolumeIcon = styled(VolumeUpIcon)`
    margin-top: 5px;
    cursor: pointer;
    background: black;
    color: grey;
`
const CustomVolumeOffIcon = styled(VolumeOffIcon)`
    margin-top: 5px;
    cursor: pointer;
    background: black;
    color: grey;
`
const CounterAbsolute = styled(Box)`
    position: absolute;
    font-size: 10px;
    width: 12px;
    top: 5px;
    left: 22px;
    opacity: 0.7;
`

const Player = (props, playerRef) => {
    const {hide} = props;
    const {src, src_type} = usePlayerState();
    usePlayerSource(src, playerRef, src_type);
    console.log('in Mini: event handlers. manifestLoaded change:', src, src_type)
    const {showMessageBox} = useMessageBox();
    const {
        currentPlaylist,
        playNextSong=()=>{},
        playPrevSong=()=>{},
    } = useCurrentPlaylist();
    const {
        muted=false,
        isPlaying=false, 
        progress="0", 
        currentTime="00:00",
        endedTime, 
        repeatMode,
        manifestLoaded,
        duration,
        onClickPlay=()=>{},
        onClickReplay10=()=>{},
        onClickForward10=()=>{},
        onClickRepeat=()=>{},
        toggleMute=()=>{},
    } = usePlayerEvent(playerRef);

    const canPlay = manifestLoaded;
    const [volumeIconActive, setVolumeIconActive] = React.useState(false);
    const onClickVolumeControl = React.useCallback(() => {
        setVolumeIconActive(true);
    },[setVolumeIconActive])

    const handleCloseVolumeSlider = React.useCallback(() => {
        setVolumeIconActive(false);
    },[])

    const handleMoveProgressSlider = React.useCallback( progressPercent => {
        const player = playerRef.current;
        const duration = player?.duration;
        if(duration === undefined || duration === null) return;
        const timeToGo = (duration * progressPercent/100);
        console.log(duration, timeToGo)
        player.currentTime = timeToGo;
    },[playerRef])

    const onClickSkipNext = React.useCallback(() => {
        playNextSong()
    },[playNextSong]);
    
    const onClickSkipPrevious = React.useCallback(() => {
        playPrevSong()
    },[playPrevSong]);

    const anchorElRef = React.useRef(null);

    React.useEffect(() => {
        const player = playerRef.current;
        if(player === undefined || player===null) return;
        if(player.duration !== player.currentTime) return;
        if(endedTime){
            if(repeatMode === 'all'){
                playNextSong();
                return
            }
            if(repeatMode === 'one'){
                player.currentTime = 0;
                player.play();
            }
        }
    },[endedTime, repeatMode, playerRef, playNextSong, showMessageBox])

    const repeatHoverButtonColor = repeatMode === 'none' ?  'white' :
                             repeatMode === 'one' ? 'red': 'yellow';
    const repeatHoverOpacity = repeatMode === 'none' ?  '0.5' :
                             repeatMode === 'one' ? '0.9': '0.9';
    const repeatCount = repeatMode === 'one' ? 1 : currentPlaylist.length;

    return (
        <Container hide={hide}>
            <ProgressContainer>
                <Progress>
                    <SliderBar value={progress} onChange={handleMoveProgressSlider} />
                </Progress>
                <Duration>
                    <TextBox fontSize="11px" text={currentTime} color={colors.textMain}></TextBox>
                    <TextBox fontSize="11px" text={duration} marginLeft="5px" color={colors.textSub}></TextBox>
                </Duration>
            </ProgressContainer>
            <ControlContainer>
                {repeatMode !== 'none' && <CounterAbsolute color={repeatHoverButtonColor}>{repeatCount}</CounterAbsolute>}
                <HoverButton hide={hide} onClick={onClickRepeat} fontcolor={repeatHoverButtonColor} opacitynormal={repeatHoverOpacity}><RepeatIcon fontSize="small"></RepeatIcon></HoverButton>
                <HoverButton hide={hide} onClick={onClickReplay10}><Replay10Icon fontSize="small"></Replay10Icon></HoverButton>
                <HoverButton hide={hide} onClick={onClickSkipPrevious}><SkipPreviousIcon></SkipPreviousIcon></HoverButton>
                <HoverButton hide={hide} onClick={onClickPlay} opacitynormal='0.7' opacityhover='1' disabled={!canPlay}>
                    {isPlaying ?                     
                        <PauseIcon fontSize="large" ></PauseIcon> :
                        <PlayArrowIcon fontSize="large" ></PlayArrowIcon>                  
                    }
                </HoverButton>
                <HoverButton hide={hide} onClick={onClickSkipNext}><SkipNextIcon></SkipNextIcon></HoverButton>
                <HoverButton hide={hide} onClick={onClickForward10}><Forward10Icon fontSize="small"></Forward10Icon></HoverButton>
                <HoverButton 
                    hide={hide}
                    onClick={onClickVolumeControl} 
                    opacitynormal={volumeIconActive ? 1 : 0.7} 
                    ref={anchorElRef}
                >
                    {muted ? 
                        <VolumeOffIcon></VolumeOffIcon> :
                        <VolumeUpIcon></VolumeUpIcon>
                    }
                </HoverButton>
                <Popover
                    open={volumeIconActive}
                    anchorEl={anchorElRef.current}
                    onClose={handleCloseVolumeSlider}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 132,
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        style: {
                            display:'flex', 
                            backgroundColor:'black',
                            overflow:'clip', 
                            padding:'10px 0px 0px 0px', 
                            justifyContent:'center'
                        }
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <VerticalSlider playerRef={playerRef}></VerticalSlider>
                        {muted ? 
                            <CustomVolumeOffIcon onClick={toggleMute}></CustomVolumeOffIcon> :
                            <CustomVolumeIcon onClick={toggleMute}></CustomVolumeIcon>
                        }
                    </Box>
                </Popover>
            </ControlContainer>
        </Container>
   );
}

export default React.memo(React.forwardRef(Player));