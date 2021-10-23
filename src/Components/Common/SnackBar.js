import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import TextBox from './TextBox';
import HoverButton from '../Common/ButtonHover';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
const ButtonContainer = styled(Box)`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;
`

const SnackBar = () => {
    return (
        <Container>
            <Box flex="1" justifyContent="center">
                <TextBox textAlign="center" text="선택된 1곡을"></TextBox>
            </Box>
            <ButtonContainer>
                <HoverButton><FileDownloadIcon fontSize="small"></FileDownloadIcon></HoverButton>
                <HoverButton><AddIcon fontSize="small"></AddIcon></HoverButton>
                <HoverButton><DeleteIcon fontSize="small"></DeleteIcon></HoverButton>
            </ButtonContainer>


        </Container>
    )
}

export default React.memo(SnackBar);