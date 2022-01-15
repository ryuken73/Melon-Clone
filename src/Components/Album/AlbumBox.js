import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBoxImage from 'Components/Album/AlbumBoxImage';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 5px;
    margin-top: 15px;
    padding: 5px;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`

const AlbumBox = props => {
    const {
        // receipt_no=0,
        // nameAlbum="잊어야 한다는", 
        // nameArtist="김광석", 
        // matched,
        // imagePath="/images/no_image_black.jpg", 
        album = {},
        resizeOnHover=true,
        preserveHtmlTag=false,
        history,
        lazyLoading=true,
        // releaseYear
    } = props;
    const {
        receipt_no,
        album_name,
        artist_bold,
        artist_matched,
        eval_imagePath,
        release_year
    } = album;

    const handleClickAlbum = React.useCallback(()=> {
        history.push(`/album/${receipt_no}/songList`, {receipt_no})
    },[history, receipt_no])

    return (
        <Container>
            <AlbumBoxImage 
                receipt_no={receipt_no} 
                title={album_name} 
                src={eval_imagePath} 
                onClick={handleClickAlbum}
                resizeOnHover={resizeOnHover}
                lazyLoading={lazyLoading}
            ></AlbumBoxImage>
            <Box marginTop="5px"></Box>
            <TextBox 
                clickable
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                text={album_name}
                preserveHtmlTag={preserveHtmlTag}
                onClick={handleClickAlbum}
            >
            </TextBox>
            <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                <LinkArtist 
                    artist={artist_bold} 
                    matched={artist_matched} 
                    preserveHtmlTag 
                    color="darkgrey"
                ></LinkArtist>
                <Box ml="auto">
                    <TextBox opacity="0.5" fontSize="10px" text={`${release_year}년`}></TextBox>
                </Box>
            </Box>
            {/* <TextBox 
                fontSize="12px" 
                color="white" 
                opacity="0.5" 
                opacityOnHover="0.6" 
                preserveHtmlTag={preserveHtmlTag}
                text={nameArtist}>
            </TextBox> */}
        </Container>
    )
}

export default React.memo(AlbumBox)
