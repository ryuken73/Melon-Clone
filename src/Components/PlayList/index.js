import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    background: white;
    flex-grow: 1;
`
const PlayList = () => {
    return (
        <Container>
            playlist
        </Container>
    )
}

export default React.memo(PlayList);
