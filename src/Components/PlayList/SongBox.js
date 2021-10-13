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
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
    {id:1, title: '잊혀진 계절', artist: 'The One (더 원) 리메이크'},
    {id:2, title: '잊혀진 계절 (리메이크곡, 2021)', artist: 'The One (더 원) 리메이크'},
    {id:3, title: 'Plastic', artist: 'Moses Sumeny'},
]

const SongBox = () => {
    return (
        <ScrollBarWithColor autoHide style={{ width:'300px', height: '100%' }}>
            <Container>
                {songs.map(song => <Song key={song.id} song={song}></Song>)}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongBox)
