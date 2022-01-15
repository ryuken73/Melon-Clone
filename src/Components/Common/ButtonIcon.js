import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonSmall from './ButtonSmall';
import TextBox from './TextBox';

const Container = styled(Box)`
    margin-left: 10px;
`

const StyledButtonSmall = styled(ButtonSmall)`
    span {
        svg.MuiSvgIcon-root {
            font-size: 12px;
        }
    }
`

const ButtonIcon = props => {
    const {iconComponent=<DeleteIcon></DeleteIcon>, text="Click"}=props;
    return (
        <Container>
            <Stack direction="row">
                <StyledButtonSmall
                    startIcon={iconComponent}
                    {...props}
                >
                   <TextBox clickable fontSize="11px" text={text}></TextBox>
                </StyledButtonSmall>
            </Stack>
        </Container>
    )
}

export default React.memo(ButtonIcon);