import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBoxWithHoverIcon from '../Common/ImageBoxWithHoverIcon';
import TextBox from '../Common/TextBox';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5px;
    margin-right: 5px;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`

const AlbumBox = props => {
    const {nameAlbum="잊어야 한다는", nameArtist="김광석"} = props;
    return (
        <Container>
            <ImageBoxWithHoverIcon width="100%" height="100%"></ImageBoxWithHoverIcon>
            <TextBox 
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                text={nameAlbum}>
            </TextBox>
            <TextBox 
                fontSize="12px" 
                color="white" 
                opacity="0.5" 
                opacityOnHover="0.6" 
                text={nameArtist}>
            </TextBox>
        </Container>
    )
}

export default AlbumBox
