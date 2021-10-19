import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    background: transparent;
`

const AlbumListView = props => {
    const {match} = props;
    return (
        <Container>
            album list view
        </Container>
    )
}

export default AlbumListView;
