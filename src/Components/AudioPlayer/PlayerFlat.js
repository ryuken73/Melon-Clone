import React from 'react';
import Box from '@mui/material/Box';
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
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import TextBox from 'Components/Common/TextBox';
import ButtonSmall from 'Components/Common/ButtonSmall';
import SliderBar from 'Components/Common/SliderBar';
import ImageBox from 'Components/Common/ImageBox';
import VerticalSlider from './VerticalSlider';
import Popover from '@mui/material/Popover';
import HoverButton from '../Common/ButtonHover';
import colors from 'config/colors';
import usePlayerSource from 'hooks/usePlayerSource';
import usePlayerState from 'hooks/usePlayerState';
import usePlayerEvent from 'hooks/usePlayerEvent';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useMessageBox from 'hooks/useMessageBox';
import useAppState from 'hooks/useAppState';

const Progress = styled(Box)`
    flex: 7;
    margin-left: 10px;
    margin-right: 10px;
`;
const Duration = styled(Box)`
    margin-left: 20px;
    display: flex;
`;
const CustomVolumeIcon = styled(VolumeUpIcon)`
    margin-top: 5px;
    cursor: pointer;
    background: maroon;
    color: grey;
`
const CustomVolumeOffIcon = styled(VolumeOffIcon)`
    margin-top: 5px;
    cursor: pointer;
    background: maroon;
    color: grey;
`
const CounterAbsolute = styled(Box)`
    position: absolute;
    font-size: 12px;
    width: 40px;
    top: 5px;
    left: 5px;
    color: red;
    opacity: 0.7;
`
const Container = styled(Box)`
    display: flex;
    height: 100%;
    flex-direction: row;
    background: maroon;
`
const InfoContainer = styled(Box)`
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ControlContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 460px;
    max-width: 460px;
    position: relative;
`
const ButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
const ProgressContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    /* background: #14180e; */
`
const UtilContainer = styled(Box)`
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`


const PlayerFlat = (props, playerRef) => {
    const {hideRightPane} = props;
    const {openPlaySkinFlat, toggleFlatPlaylist} = useAppState();
    const {src, src_type, song={}} = usePlayerState();
    // const [manifestLoaded=false, duration="00:00"] = usePlayerSource(src, playerRef, src_type);
    // console.log('in Flat: event handlers. manifestLoaded change:', src, manifestLoaded)
    const {showMessageBox} = useMessageBox();
    const {
        albumImageSrc='',
        song_name="곡명",
        artist="아티스트",
        getFileSizeParams='',
        currentPlaying=false,
    } = song;
    const {
        currentPlaylist,
        currentPlaylistIndex,
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
        volume,
        onClickPlay=()=>{},
        onClickReplay10=()=>{},
        onClickForward10=()=>{},
        onClickRepeat=()=>{},
        toggleMute=()=>{},
        handleVolumeControl=()=>{}
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
        if(Number.isNaN(timeToGo) || Number.isNaN(duration)) return;
        player.currentTime = timeToGo;
    },[playerRef])

    const onClickSkipNext = React.useCallback(() => {
        playNextSong()
    },[playNextSong]);
    
    const onClickSkipPrevious = React.useCallback(() => {
        playPrevSong()
    },[playPrevSong]);

    const toggleFlatPlaylistOpen = React.useCallback(() => {
        toggleFlatPlaylist()
    },[toggleFlatPlaylist]);

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
    const repeatCount = repeatMode === 'one' ? 1 : `${currentPlaylistIndex+1}/${currentPlaylist.length}`;

    const width = getFileSizeParams === 'archive' ? '70px':'50px';
    const objectFit = getFileSizeParams === 'archive' ? 'contain':'cover';
    return (
        <Container>
            <InfoContainer>
                <Box mx="10px" >
                    <ImageBox src={albumImageSrc} objectFit={objectFit} width={width} height="20px"></ImageBox>
                </Box>
                <Box mr="10px" display="flex" flexDirection="column">
                    <TextBox textalign="center" fontSize="13px" text={song_name} color={currentPlaying ? 'yellow':colors.textMain}></TextBox>
                    <TextBox textalign="center" text={artist}></TextBox>
                </Box>
            </InfoContainer>
            <ControlContainer>
                <ButtonsContainer>
                    {repeatMode !== 'none' && <CounterAbsolute color={repeatHoverButtonColor}>{repeatCount}</CounterAbsolute>}
                    <HoverButton onClick={onClickRepeat} fontcolor={repeatHoverButtonColor} opacitynormal={repeatHoverOpacity}><RepeatIcon fontSize="large"></RepeatIcon></HoverButton>
                    <HoverButton onClick={onClickReplay10}><Replay10Icon fontSize="large"></Replay10Icon></HoverButton>
                    <HoverButton onClick={onClickSkipPrevious}><SkipPreviousIcon fontSize="large"></SkipPreviousIcon></HoverButton>
                    <HoverButton onClick={onClickPlay} opacitynormal='1' opacityhover='1' disabled={!canPlay}>
                        {isPlaying ?                     
                            <PauseIcon fontSize="large" ></PauseIcon> :
                            <PlayArrowIcon fontSize="large" ></PlayArrowIcon>                  
                        }
                    </HoverButton>
                    <HoverButton onClick={onClickSkipNext}><SkipNextIcon fontSize="large"></SkipNextIcon></HoverButton>
                    <HoverButton onClick={onClickForward10}><Forward10Icon fontSize="large"></Forward10Icon></HoverButton>
                    <HoverButton 
                        onClick={onClickVolumeControl} 
                        opacitynormal={volumeIconActive ? 0 : 0.7} 
                        ref={anchorElRef}
                    >
                        {muted ? 
                            <VolumeOffIcon fontSize="large"></VolumeOffIcon> :
                            <VolumeUpIcon fontSize="large"></VolumeUpIcon>
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
                            vertical: 137,
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            style: {
                                display:'flex', 
                                backgroundColor:'maroon',
                                overflow:'clip', 
                                padding:'9px 0px 0px 0px', 
                                justifyContent:'center'
                            }
                        }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {/* <VerticalSlider playerRef={playerRef}></VerticalSlider> */}
                            <VerticalSlider muted={muted} volume={volume} handleVolumeControl={handleVolumeControl}></VerticalSlider>
                            {muted ? 
                                <CustomVolumeOffIcon fontSize="large" onClick={toggleMute}></CustomVolumeOffIcon> :
                                <CustomVolumeIcon fontSize="large" onClick={toggleMute}></CustomVolumeIcon>
                            }
                        </Box>
                    </Popover>
                </ButtonsContainer>
                <ProgressContainer>
                    <TextBox ml="10 px" fontSize="11px" text={currentTime} color={colors.textMain}></TextBox>
                    <Progress>
                        <SliderBar value={progress} onChange={handleMoveProgressSlider} />
                    </Progress>
                    <TextBox mr="10px" fontSize="11px" text={duration} marginLeft="5px" color={colors.textMain}></TextBox>
                </ProgressContainer>
            </ControlContainer>
            <UtilContainer>
                <Box ml="auto" mt="5px" mr="20px" height={!hideRightPane ? "0px":"100%"} >
                    <HoverButton opacitynormal="0.7" opacityhover="0.9" onClick={toggleFlatPlaylistOpen} sx={{paddingBottom: '0px'}}>
                        {!openPlaySkinFlat && <QueueMusicIcon sx={{fontSize: '50px'}}></QueueMusicIcon>}
                        {openPlaySkinFlat && <PlaylistRemoveIcon sx={{fontSize: '50px'}}></PlaylistRemoveIcon>}
                    </HoverButton>
                    <TextBox opacity="1" text="플레이리스트"></TextBox>
                </Box>
            </UtilContainer>
        </Container>
   );
}

export default React.memo(React.forwardRef(PlayerFlat));