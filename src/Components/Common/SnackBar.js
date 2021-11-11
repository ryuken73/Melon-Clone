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
        width: ${props => props.width || '80%'};
        padding: 5px;
        background: ${props => props.bgcolor || colors.highCenterPane};
        left: 0;
        right: 0;
        margin: auto;
    }
`


const SnackBar = props => {
    const {hidden=true, direction="up", children} = props;
    const {containerProps} = props;
    return (
        <Slide direction={direction} timeout={500} in={!hidden} mountOnEnter unmountOnExit>
            <Container {...containerProps}>
                {children}
            </Container>
        </Slide>
    )
}

export default React.memo(SnackBar);