import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import useAlbumInfo from 'hooks/useAlbumInfo';

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`
const InfoContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`

const AlbumDetailInfo = props => {
    const {albumInfo} = props
    // console.log('rerender AlbumDetailInfo:', albumInfo)
    const {
        album_name = '',
        album_type = '',
        title_song = '',
        producer = '',
        artist = '',
    } = albumInfo;
    return (
        <InfoContainer>
            <TextBox mb="20px" fontSize="14px" text={album_type}></TextBox>
            <TextBox mt="10px" fontSize="18px" color="white" text={album_name}></TextBox>
            <TextBox my="5px" fontSize="15px" opacity="0.9" text={artist}></TextBox>
            <TextBox fontSize="14px" cursor="auto" text={producer}></TextBox>
        </InfoContainer>
    )
}

const AlbumDetailHeader = props => {
    const {receipt_no=1} = props;
    const albumInfo = useAlbumInfo(receipt_no);
    const {eval_imagePath = '/images/no-image.png'} = albumInfo;
    return (
        <Container>
            <ImageBox width="150px" height="150px" src={eval_imagePath}></ImageBox>
            <AlbumDetailInfo albumInfo={albumInfo}></AlbumDetailInfo>
        </Container>
    )
}

export default React.memo(AlbumDetailHeader)