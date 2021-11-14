import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBoxWithHoverIcon from '../Common/ImageBoxWithHoverIcon';
import TextBox from '../Common/TextBox';

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
        imagePath="/images/no_image_black.jpg", 
        resizeOnHover=true,
        history
    } = props;
    const handleClickAlbum = React.useCallback(()=> {
        history.push(`/album/${receipt_no}/songList`, {receipt_no})
    },[history.location])
    // console.log('re-render albumbox:', nameAlbum)
    return (
        <Container>
            <ImageBoxWithHoverIcon 
                receipt_no={receipt_no} 
                title={nameAlbum} 
                src={imagePath} 
                onClick={handleClickAlbum}
                resizeOnHover={resizeOnHover}
            ></ImageBoxWithHoverIcon>
            <Box marginTop="5px"></Box>
            <TextBox 
                fontSize="14px" 
                color="white" 
                opacity="0.7" 
                opacityOnHover="0.9"
                text={nameAlbum}
                onClick={handleClickAlbum}
            >
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

export default React.memo(AlbumBox)
