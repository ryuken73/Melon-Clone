import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import RecentAlbums from '../Components/PortalView/RecentAlbums';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const PortalView = props => {
    const {match} = props;
    return (
        <Container>
            <RecentAlbums></RecentAlbums>
        </Container>
    )
}

export default React.memo(PortalView);
