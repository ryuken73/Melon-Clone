import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    background: transparent;
`

const SongView = props => {
    const {match} = props;
    return (
        <Container>
            song view[{match.params.id}]
        </Container>
    )
}

export default React.memo(SongView);
