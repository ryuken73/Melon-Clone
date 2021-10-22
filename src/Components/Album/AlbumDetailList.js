import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import ButtonIcon from '../Common/ButtonIcon';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongItemsWithIndex from '../Song/SongItemsWithIndex';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const ButtonContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    .MuiSvgIcon-root {
        color: ${props => props.color || 'white'};
        opacity: ${props => props.opacitynormal || '0.7'};
    }
`

const AlbumDetailList = props => {
    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon 
                    text="전체선택" 
                    iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                    background={colors.light2CenterPane}
                    hoverBackground={colors.light3CenterPane}
                ></ButtonIcon>
                <ButtonIcon 
                    text="전체재생" 
                    iconComponent={<PlayArrowIcon fontSize="small"></PlayArrowIcon>} 
                    background={colors.light2CenterPane}
                    hoverBackground={colors.light3CenterPane}
                ></ButtonIcon>
            </ButtonContainer>
            <SongItemsWithIndex></SongItemsWithIndex>
        </Container>
    )
}

export default React.memo(AlbumDetailList)