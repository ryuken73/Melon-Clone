import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from 'Components/Album/AlbumBox';
import AlbumBoxSkeleton from 'Components/Album/AlbumBoxSkeleton';
import Swiper from 'Components/Common/Swiper';
import CONSTANTS from 'config/constants';

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const AlbumList = props => {
    const {history} = props;
    const {isLoading, albums} = props;
    const skeletonAlbum = new Array(CONSTANTS.SWIPE_SLIDE_TO_SHHOW);
    skeletonAlbum.fill(0);
    return (
        <Container width="100%">
            {/* {albums.length > 0 && */}
                <Swiper>
                    {isLoading ? 
                        skeletonAlbum.map(album => (
                            <AlbumBoxSkeleton></AlbumBoxSkeleton>
                        )):
                        albums.map(album => (
                            <AlbumBox 
                                album={album}
                                key={album.receipt_no}
                                history={history}
                                resizeOnHover={false}
                            ></AlbumBox>
                        ))
                    }
                </Swiper>
            {/* } */}
        </Container>
    )
}

export default React.memo(AlbumList)