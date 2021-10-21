import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumListSwiperPage from '../Album/AlbumListSwiperPage';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const PortalPage = props => {
    const {match} = props;
    return (
        <Container>
            <AlbumListSwiperPage></AlbumListSwiperPage>
        </Container>
    )
}

export default React.memo(PortalPage);
