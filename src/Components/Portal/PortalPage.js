import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumListSwiperPage from 'Components/Portal/AlbumList/AlbumListSwiperPage';
import ArchiveRecentPage from 'Components/Portal/Archive/ArchiveRecentPage';

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
            <Box>
                <AlbumListSwiperPage></AlbumListSwiperPage>
            </Box>
            <Box mt="30px">
                <ArchiveRecentPage></ArchiveRecentPage>
            </Box>
        </Container>
    )
}

export default React.memo(PortalPage);
