import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    background: transparent;
`

const PortalView = props => {
    const {match} = props;
    return (
        <Container>
            portal[{match.params.id}]
        </Container>
    )
}

export default PortalView;
