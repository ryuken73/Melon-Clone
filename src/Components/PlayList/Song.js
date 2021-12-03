import React from 'react'
import Box from '@mui/material/Box';
import styled, {keyframes, css} from 'styled-components';
import TextBox from '../Common/TextBox';
import SmallCheckBox from '../Common/CheckBox';
import PlayingIcon from 'Components/Common/PlayingIcon';
import colors from '../../config/colors';
import useSongPlaylist from 'hooks/useSongPlaylist';
import usePlayerState from 'hooks/usePlayerState';

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

const Song = props => {
    const defaultSong = {
        id: 1,
        song_name: '제목',
        artist: 'Artist',
        checkedPlaylist: false
    }
    const [doubleClicked, setDoubleClicked] = React.useState(false);
    const {song=defaultSong, sequenceId} = props;
    const {id, song_name, artist, checkedPlaylist, albumImageSrc, src, currentPlaying} = song;
    console.log('^^^^:', id, song_name, artist, checkedPlaylist, currentPlaying)
    // const [loadPlayer, setLoadPlayer] = React.useState(false);
    const [removeFromPlaylist, setChecked] = useSongPlaylist(sequenceId);
    const {setPlayerSource} = usePlayerState();
    const onChecked = React.useCallback(() => {
        setChecked(!checkedPlaylist)
    },[checkedPlaylist, setChecked])
    const onDoubleClick = React.useCallback(() => {
        setDoubleClicked(true);
        setPlayerSource(src, albumImageSrc, sequenceId);
    },[src, albumImageSrc, sequenceId, setPlayerSource])
    React.useEffect(() => {
        if(currentPlaying){
            setDoubleClicked(false)
        }
    },[currentPlaying])

    return (
        <Container doubleClicked={doubleClicked}>
            <SmallCheckBox checked={checkedPlaylist} setChecked={onChecked} />
            <Artist>
                {currentPlaying && <PlayingIcon></PlayingIcon>}
                <TextBox text={song_name} onDoubleClick={onDoubleClick} doubleClicked={doubleClicked} color={currentPlaying && 'gold'} margin="0px 15px 0px 0px" width="125px"></TextBox>
            </Artist>
            <TextBox text={artist} color={currentPlaying && 'gold'} width="90px"></TextBox>
        </Container>
    )
}

export default React.memo(Song)
