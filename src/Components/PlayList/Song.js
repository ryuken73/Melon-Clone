import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from '../Common/TextBox';
import SmallCheckBox from '../Common/CheckBox';
import PlayingIcon from 'Components/Common/PlayingIcon';
import colors from '../../config/colors';
import useSongPlaylist from 'hooks/useSongPlaylist';
import useAudioPlayer from 'hooks/useAudioPlayer';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        &:hover {
            background: ${colors.centerPane}
        }
    }
`

const Song = props => {
    const defaultSong = {
        id: 1,
        title: '제목',
        artist: 'Artist',
        checkedPlaylist: false
    }
    const {song=defaultSong, sequenceId} = props;
    const {id, title, artist, checkedPlaylist, albumImageSrc, src, currentPlaying} = song;
    // const [loadPlayer, setLoadPlayer] = React.useState(false);
    const [removeFromPlaylist, setChecked] = useSongPlaylist(sequenceId);
    const {setPlayerSource} = useAudioPlayer();
    const onChecked = React.useCallback(() => {
        setChecked(!checkedPlaylist)
    },[checkedPlaylist, setChecked])
    const onDoubleClick = React.useCallback(() => {
        setPlayerSource(src, albumImageSrc, sequenceId);
    },[src, albumImageSrc, id, setPlayerSource])

    return (
        <Container>
            <SmallCheckBox checked={checkedPlaylist} setChecked={onChecked} />
            {currentPlaying && <PlayingIcon></PlayingIcon>}
            <TextBox text={title} onDoubleClick={onDoubleClick} margin="0px 15px 0px 0px" width="150px"></TextBox>
            <TextBox text={artist} width="90px"></TextBox>
        </Container>
    )
}

export default React.memo(Song)
