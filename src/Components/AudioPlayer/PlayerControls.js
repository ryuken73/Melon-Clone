import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import IconButton from '@mui/material/IconButton';
import VerticalSlider from '../Common/SliderVertical';
import Popover from '@mui/material/Popover';

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    background: black;
`
const HoverButton = styled(IconButton)`
    .MuiSvgIcon-root {
        color: ${props => props.color || 'white'};
        opacity: ${props => props.opacitynormal || '0.5'};
        &:hover {
            opacity: ${props => props.opacityhover || '0.7'};
            /* color: white; */
        }
    }
`

const PlayerControls = props => {
    const {
        onClickRepeat=()=>{},
        onClickReplay10=()=>{},
        onClickSkipPrevious=()=>{},
        onClickPlay=()=>{},
        onClickSkipNext=()=>{},
        onClickForward10=()=>{},
        onClickVolumeUp=()=>{}
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
            <HoverButton onClick={onClickRepeat}><RepeatIcon fontSize="small"></RepeatIcon></HoverButton>
            <HoverButton onClick={onClickReplay10}><Replay10Icon fontSize="small"></Replay10Icon></HoverButton>
            <HoverButton onClick={onClickSkipPrevious}><SkipPreviousIcon></SkipPreviousIcon></HoverButton>
            <HoverButton onClick={onClickPlay} opacitynormal='0.7' opacityhover='1'><PlayArrowIcon fontSize="large" ></PlayArrowIcon></HoverButton>
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
        </Container>
    )
}

export default React.memo(PlayerControls)
