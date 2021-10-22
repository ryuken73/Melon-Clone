import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Song from './Song';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const songs = [
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:4, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:5, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:6, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:7, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:8, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:9, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:10, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:11, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:12, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:13, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:14, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:15, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:16, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:17, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:18, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:19, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:20, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:21, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:22, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:23, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:24, title: 'last song', artist: 'Moses Sumeny'},
]

const SongBox = () => {
    return (
        <ScrollBarWithColor autoHide style={{ width:'300px', height: 'calc(100vh - 500px)' }}>
            <Container>
                {songs.map(song => <Song key={song.id} song={song}></Song>)}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongBox)
