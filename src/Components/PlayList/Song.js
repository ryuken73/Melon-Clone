import React from 'react'
import Box from '@mui/material/Box';
import SmartDisplay from '@mui/icons-material/SmartDisplay'
import styled, {keyframes, css} from 'styled-components';
import TextBox from '../Common/TextBox';
import SmallCheckBox from '../Common/CheckBox';
import PlayingIcon from 'Components/Common/PlayingIcon';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import colors from '../../config/colors';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import usePlayerState from 'hooks/usePlayerState';
import CONSTANTS from 'config/constants';

const {SRC_TYPE} = CONSTANTS;

const Mount = keyframes`
    from {
        background-color: darkSlategrey;
    }
    to {
        background-color: transparent;
    }
`

const dbClickedStyle = css`
        animation: ${Mount} 1s ease;
    `

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        ${props => (props.doubleClicked && dbClickedStyle)}; 
        &:hover {
            background: ${colors.centerPane};
        }
    }
`
const Artist = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 150px;
`
const SmallSmartDisplay = styled(SmartDisplay)`
    font-size: 16px !important;
    color: ${props => props.playing ? 'gold':'white'};
    opacity: 0.5;
    cursor: auto;
    margin-left: 2px;
`
const CustomHandleIcon = styled(DragHandleIcon)`
    && {
        font-size: 14px;
        opacity: 0.7;
        &:hover {
            opacity: 0.9;
            font-size: 16px;
        }
    }
`

const Song = props => {
    const defaultSong = {
        id: 1,
        song_name: '제목',
        artist: 'Artist',
        checkedPlaylist: false
    }
    const [doubleClicked, setDoubleClicked] = React.useState(false);
    const {song=defaultSong, sequenceId, provided} = props;
    const {id, song_name, artist, checkedPlaylist, albumImageSrc, src, currentPlaying, src_type} = song;
    // console.log('^^^^:', id, song_name, artist, checkedPlaylist, currentPlaying)
    const {setChecked, setLastChecked, setCheckedFromLastToThis} = useCurrentPlaylist();
    const {src: currentLoadedSrc, setPlayerSource, playNow} = usePlayerState();

    const onChecked = React.useCallback(checked => {
        setChecked(id, !checkedPlaylist)
    },[id, checkedPlaylist, setChecked])

    const onClickCheckBox = React.useCallback(event => {
        if(!event.shiftKey){
            setLastChecked(id);
            return;
        }
        if(event.shiftKey){
            setCheckedFromLastToThis(id)
        }
    },[setLastChecked, setCheckedFromLastToThis, id])

    const onDoubleClick = React.useCallback(() => {
        setDoubleClicked(true);
        setPlayerSource(src, albumImageSrc, sequenceId, song);
        src === currentLoadedSrc && playNow()
    },[src, albumImageSrc, sequenceId, setPlayerSource, song, currentLoadedSrc, playNow])

    React.useEffect(() => {
        if(currentPlaying){
            setDoubleClicked(false)
        }
    },[currentPlaying])

    return (
        <Container doubleClicked={doubleClicked}>
            <SmallCheckBox checked={checkedPlaylist} setChecked={onChecked} handleClick={onClickCheckBox}/>
            <Artist>
                {currentPlaying && <PlayingIcon></PlayingIcon>}
                {src_type === SRC_TYPE.BORA && <SmallSmartDisplay playing={currentPlaying}></SmallSmartDisplay>}
                <TextBox clickable text={song_name} onDoubleClick={onDoubleClick} doubleClicked={doubleClicked} color={currentPlaying && 'gold'} margin="0px 15px 0px 0px" width="125px"></TextBox>
            </Artist>
            <TextBox text={artist} color={currentPlaying && 'gold'} width="90px"></TextBox>
            <Box width="30px" pr="10px" {...provided.dragHandleProps}>
                <CustomHandleIcon></CustomHandleIcon>
            </Box>
        </Container>
    )
}

export default React.memo(Song)
