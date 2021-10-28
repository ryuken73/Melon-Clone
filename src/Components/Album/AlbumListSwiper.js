import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import Swiper from '../Common/Swiper';
import useFetchRecentAlbums from '../../hooks/useFetchRecentAlbums';

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const FETCH_COUNT = 15;

const AlbumList = props => {
    const {history} = props;
    const {albums, error, loading} = useFetchRecentAlbums(FETCH_COUNT);
    return (
        <Container width="100%">
            {albums.length > 0 &&
                <Swiper>
                    {albums.map(album => (
                        <AlbumBox 
                            key={album.receipt_no}
                            nameAlbum={album.album_name} 
                            nameArtist={album.artist}
                            imagePath={album.eval_imagePath}
                            history={history}
                        ></AlbumBox>
                    ))}
                </Swiper>
            }
        </Container>
    )
}

export default React.memo(AlbumList)