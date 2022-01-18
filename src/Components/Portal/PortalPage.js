import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumListSwiperPage from 'Components/Portal/AlbumList/AlbumListSwiperPage';
import ArchiveRecentPage from 'Components/Portal/Archive/ArchiveRecentPage';
import PodcastRecentPage from 'Components/Portal/Podcast/PodcastRecentPage';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import useMediaQueryEasy from  'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const PortalPage = props => {
    const {match} = props;
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor
            autoHide
            style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 100px)` }}
        >
            <Container>
                <Box>
                    <AlbumListSwiperPage></AlbumListSwiperPage>
                </Box>
                <Box mt="30px">
                    <ArchiveRecentPage></ArchiveRecentPage>
                </Box>
                <Box mt="30px">
                    <PodcastRecentPage></PodcastRecentPage>
                </Box>
            </Container>
        </ScrollBarWithColor>
   )
}

export default React.memo(PortalPage);
