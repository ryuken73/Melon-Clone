import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Song from './Song';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongList = () => {
    const currentPlaylist = useCurrentPlaylist();
    const songs = currentPlaylist.length > 0 ? currentPlaylist.map(song => {
        const {rownum, song_name, artist} = song;
        return {id: rownum, title: song_name, artist}
    }) : [];
    return (
        <ScrollBarWithColor autoHide style={{ width:'300px', height: 'calc(100vh - 500px)' }}>
            <Container>
                {songs.map(song => <Song key={song.id} song={song}></Song>)}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongList)
