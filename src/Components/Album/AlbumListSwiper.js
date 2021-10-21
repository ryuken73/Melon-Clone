import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import Swiper from '../Common/Swiper';

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`

const AlbumList = props => {
    const {albums={}, history} = props;
    return (
        <Container width="100%">
            <Swiper>
                {albums.map(album => (
                    <AlbumBox 
                        key={album.id}
                        nameAlbum={album.nameAlbum} 
                        nameArtist={album.nameArtist}
                        history={history}
                     ></AlbumBox>
                ))}
            </Swiper>
        </Container>
    )
}

export default React.memo(AlbumList)