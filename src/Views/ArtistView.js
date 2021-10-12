import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    background: transparent;
`

const ArtistView = props => {
    const {match} = props;
    return (
        <Container>
            artist view[{match.params.id}]
        </Container>
    )
}

export default ArtistView;
