import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBoxWithHoverIcon from '../Common/ImageBoxWithHoverIcon';
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
        receipt_no=0,
        nameAlbum="잊어야 한다는", 
        nameArtist="김광석", 
        matched,
        imagePath="/images/no_image_black.jpg", 
        resizeOnHover=true,
        preserveHtmlTag=false,
        history,
        lazyLoading=true
    } = props;
    const handleClickAlbum = React.useCallback(()=> {
        history.push(`/album/${receipt_no}/songList`, {receipt_no})
    },[history, receipt_no])
    // console.log('re-render albumbox:', nameAlbum)
    return (
        <Container>
            <ImageBoxWithHoverIcon 
                receipt_no={receipt_no} 
                title={nameAlbum} 
                src={imagePath} 
                onClick={handleClickAlbum}
                resizeOnHover={resizeOnHover}
                lazyLoading={lazyLoading}
            ></ImageBoxWithHoverIcon>
            <Box marginTop="5px"></Box>
            <TextBox 
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                text={nameAlbum}
                preserveHtmlTag={preserveHtmlTag}
                onClick={handleClickAlbum}
            >
            </TextBox>
            <LinkArtist 
                artist={nameArtist} 
                matched={matched} 
                preserveHtmlTag 
                color="darkgrey"
            ></LinkArtist>
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
