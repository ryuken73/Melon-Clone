import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from 'Components/Album/AlbumBox';
import Swiper from 'Components/Common/Swiper';
import useQueryAlbums from 'hooks/useQueryAlbums';
import createAlbum from 'lib/albumClass';

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const PAGE_NUM = 1;
const FETCH_COUNT = 15;

const AlbumList = props => {
    const {history} = props;
    const result = useQueryAlbums(PAGE_NUM, FETCH_COUNT);
    const albums = React.useMemo(() => createAlbum(result.data),[result.data])
    return (
        <Container width="100%">
            {albums.length > 0 &&
                <Swiper>
                    {albums.map(album => (
                        <AlbumBox 
                            key={album.receipt_no}
                            receipt_no={album.receipt_no}
                            nameAlbum={album.album_name} 
                            nameArtist={album.artist}
                            imagePath={album.eval_imagePath}
                            history={history}
                            resizeOnHover={false}
                        ></AlbumBox>
                    ))}
                </Swiper>
            }
        </Container>
    )
}

export default React.memo(AlbumList)