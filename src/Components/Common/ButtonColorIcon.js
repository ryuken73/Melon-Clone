import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import TextBox from './TextBox';

const Container = styled(Box)`
    margin-left: 10px;
`

const StyledButtonSmall = styled(Button)`
&&{
    color: black;
    font-size: ${props => props.fontSize || '10px'};
    background: ${props => props.background || 'grey'};
    opacity: 0.5;
    border-radius: 10px;
    border: ${props => props.border || 'none'}; 
    padding: 1px 5px 1px 5px;
    &:hover {
        background:${props => props.hoverBackground || 'white'};
        border: ${props => props.hoverBorder || 'none'};

    }
    span {
        margin-right: 3px;
    }

}
`

const ButtonIcon = props => {
    const {
        iconComponent=<DeleteIcon></DeleteIcon>, 
        text="Click"
    }=props;
    return (
        <Container>
                <StyledButtonSmall
                    startIcon={iconComponent}
                    {...props}
                >
                   <Box color="black" fontWeight="bold" fontSize="11px">{text}</Box>
                </StyledButtonSmall>
        </Container>
    )
}

export default React.memo(ButtonIcon);