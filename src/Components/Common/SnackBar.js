import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import Slide from '@mui/material/Slide';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        border-radius: 8px;
        bottom: 10px;
        width: 80%;
        padding: 5px;
        background: ${colors.highCenterPane}
    }
`


const SnackBar = props => {
    const {show=true, children} = props;
    return (
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Container>
                {children}
            </Container>
        </Slide>
    )
}

export default React.memo(SnackBar);