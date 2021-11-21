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
    const {currentPlaylist} = useCurrentPlaylist();
    const songs = currentPlaylist.length > 0 ? currentPlaylist.map(song => {
        console.log('#### song', song)
        return {title: song.song_name, ...song}
    }) : [];

    console.log('###songs:', songs)
    return (
        <ScrollBarWithColor autoHide style={{ width:'300px', height: 'calc(100vh - 450px)' }}>
            <Container>
                {songs.map((song,index) => <Song key={index} sequenceId ={index} song={song}></Song>)}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongList)
