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
import IconButton from '@mui/material/IconButton';
import TextBox from 'Components/Common/TextBox';
import SliderBar from 'Components/Common/SliderBar';
import VerticalSlider from '../Common/SliderVertical';
import Popover from '@mui/material/Popover';
import HoverButton from '../Common/ButtonHover';
import colors from 'config/colors';

const Container = styled(Box)`
    display: flex;
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
`

function Player(props) {

    const {
        playerRef=null, 
        canPlay=false, 
        isPlaying=false,
        progress="0",
        currentTime="00:00",
        duration="00:00",
        // playerStopped=true
    } = props;

    const {
        onClickRepeat=()=>{},
        onClickReplay10=()=>{},
        onClickSkipPrevious=()=>{},
        onClickSkipNext=()=>{},
        onClickForward10=()=>{},
        onClickVolumeUp=()=>{},
        onClickPlay=()=>{},
        handleMoveProgressSlider=()=>{}
    } = props;  

    const [volumeIconActive, setVolumeIconActive] = React.useState(false);

    const onClickVolumeControl = React.useCallback(() => {
        setVolumeIconActive(true);
        onClickVolumeUp();
    },[onClickVolumeUp])

    const handleCloseVolumeSlider = React.useCallback(() => {
        setVolumeIconActive(false);
    },[])

    const anchorElRef = React.useRef(null);

    return (
        <Container>
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
                <HoverButton onClick={onClickRepeat}><RepeatIcon fontSize="small"></RepeatIcon></HoverButton>
                <HoverButton onClick={onClickReplay10}><Replay10Icon fontSize="small"></Replay10Icon></HoverButton>
                <HoverButton onClick={onClickSkipPrevious}><SkipPreviousIcon></SkipPreviousIcon></HoverButton>
                <HoverButton onClick={onClickPlay} opacitynormal='0.7' opacityhover='1' disabled={!canPlay}>
                    {isPlaying ?                     
                        <PauseIcon fontSize="large" ></PauseIcon> :
                        <PlayArrowIcon fontSize="large" ></PlayArrowIcon>                  
                    }
                </HoverButton>
                <HoverButton onClick={onClickSkipNext}><SkipNextIcon></SkipNextIcon></HoverButton>
                <HoverButton onClick={onClickForward10}><Forward10Icon fontSize="small"></Forward10Icon></HoverButton>
                <HoverButton onClick={onClickVolumeControl} opacitynormal={volumeIconActive ? 1 : 0.7} ref={anchorElRef}><VolumeUpIcon></VolumeUpIcon></HoverButton>
                <Popover
                    open={volumeIconActive}
                    anchorEl={anchorElRef.current}
                    onClose={handleCloseVolumeSlider}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        style: {display:'flex', backgroundColor:'grey',overflow:'clip', padding:'5px 0px 5px 0px', justifyContent:'center'}
                    }}
                >
                    <VerticalSlider></VerticalSlider>
                </Popover>
            </ControlContainer>
        </Container>
   );
}

export default React.memo(Player);