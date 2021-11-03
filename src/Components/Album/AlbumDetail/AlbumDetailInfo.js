import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`

const AlbumDetailInfo = () => {
    return (
        <Container>
            Album Info
        </Container>
    )
}

export default React.memo(AlbumDetailInfo)