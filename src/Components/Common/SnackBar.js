import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';

const Container = styled(Box)`
    && {
        position: absolute;
        bottom: 10px;
        background: ${colors.centerPane}
    }
`

const SnackBar = () => {
    return (
        <Container>
            Absolute Box
        </Container>
    )
}

export default SnackBar;