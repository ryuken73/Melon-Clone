import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBoxImage from 'Components/Album/AlbumBoxImage';
import TextBox from 'Components/Common/TextBox';
import colors from 'config/colors'

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
        nameAlbum="000000000000000000", 
        nameArtist="00000000000003", 
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
    const skeletonTitleColor = colors.highCenterPane;
    return (
        <Container>
            <AlbumBoxImage 
                receipt_no={receipt_no} 
                title={nameAlbum} 
                src={imagePath} 
                onClick={handleClickAlbum}
                resizeOnHover={resizeOnHover}
                lazyLoading={lazyLoading}
            ></AlbumBoxImage>
            <Box marginTop="5px"></Box>
            <TextBox 
                fontSize="14px" 
                color={skeletonTitleColor}
                opacity="0.7" 
                opacityOnHover="0.9"
                text={nameAlbum}
                preserveHtmlTag={preserveHtmlTag}
                onClick={handleClickAlbum}
                bgcolor={skeletonTitleColor}
            >
            </TextBox>
            <TextBox 
                mt="5px"
                fontSize="12px" 
                text={nameArtist}
                opacity="0.7" 
                opacityOnHover="0.9"
                color={skeletonTitleColor}
                bgcolor={skeletonTitleColor}
            ></TextBox>
        </Container>
    )
}

export default React.memo(AlbumBox)
