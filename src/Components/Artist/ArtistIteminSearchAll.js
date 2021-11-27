import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 10px;
`

function ArtistIteminSearchAll(props) {
    const {artist} = props;
    const {artist_bold, artist_type} = artist;
    const image_path = artist.eval_imagePath;
    return (
        <Container>
            <ImageBox width="150px" height="150px" src={image_path}></ImageBox>            
            <Box height="10px"></Box>
            <TextBox 
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                preserveHtmlTag 
                text={artist_bold}
            ></TextBox>
            <TextBox preserveHtmlTag text={artist_type}></TextBox>
        </Container>
    )
}

export default React.memo(ArtistIteminSearchAll)