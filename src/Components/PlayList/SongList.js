import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Song from './Song';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongList = () => {
    const {currentPlaylist} = useCurrentPlaylist();
    // const songs = currentPlaylist.length > 0 ? currentPlaylist.map(song => {
    //     console.log('#### song', song)
    //     return {title: song.song_name, ...song}
    // }) : [];

    console.log('###songs:', currentPlaylist)
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor autoHide style={{ width:'300px', height: `calc(${fullViewHeightMediaQuery} - 440px)`}}>
            <Container>
                {currentPlaylist.map((song,index) => <Song key={index} sequenceId ={index} song={song}></Song>)}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongList)
