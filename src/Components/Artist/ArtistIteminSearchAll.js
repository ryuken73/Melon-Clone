import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 150px;
    margin: 10px;
`

function ArtistIteminSearchAll(props) {
    const {artist} = props;
    const {artist_bold, artist_matched, artist_type} = artist;
    const image_path = artist.eval_imagePath;
    return (
        <Container>
            <ImageBox width="150px" height="150px" src={image_path}></ImageBox>            
            <Box height="10px"></Box>
            <LinkArtist 
                artist={artist_bold}
                matched={artist_matched} 
                preserveHtmlTag 
                color="darkgrey"
            ></LinkArtist>
            <TextBox preserveHtmlTag text={artist_type} cursor="auto"></TextBox>
        </Container>
    )
}

export default React.memo(ArtistIteminSearchAll)