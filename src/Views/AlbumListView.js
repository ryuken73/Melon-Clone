import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AllRecentAlbums from '../Components/AlbumView/AllRecentAlbums';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`

const AlbumListView = props => {
    const {match} = props;
    return (
        <Container>
            <AllRecentAlbums />
        </Container>

    )
}

export default React.memo(AlbumListView);
