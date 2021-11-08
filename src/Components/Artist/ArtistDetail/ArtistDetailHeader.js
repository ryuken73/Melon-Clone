import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import useAlbumInfo from 'hooks/useAlbumInfo';
import ItemWithTitleNValue from 'Components/Common/ItemWithTitleNValue';

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

const TITLE_WIDTH = '80px';

const ArtistDetailInfo = props => {
    const {albumInfo} = props
    // console.log('rerender ArtistDetailInfo:', albumInfo)
    const {
        artist = '아이유',
        artist_type = '여성솔로',
        title_song = '나만 몰랐던 이야기',
        debut_song = '미아'
    } = albumInfo;
    return (
        <InfoContainer>
            <TextBox mt="10px" fontSize="18px" color="white" text={artist}></TextBox>
            <ItemWithTitleNValue fontSize="14px" titleProps={{width: TITLE_WIDTH}} title="활동유형" value={artist_type}></ItemWithTitleNValue>
            <ItemWithTitleNValue fontSize="15px" titleProps={{width: TITLE_WIDTH}} title="대표곡" value={title_song}></ItemWithTitleNValue>
            <ItemWithTitleNValue fontSize="15px" titleProps={{width: TITLE_WIDTH}} title="데뷔곡" value={debut_song}></ItemWithTitleNValue>
        </InfoContainer>
    )
}

const ArtistDetailHeader = props => {
    const {receipt_no=1} = props;
    const albumInfo = useAlbumInfo(receipt_no);
    const {eval_imagePath = '/images/no-image.png'} = albumInfo;
    return (
        <Container>
            <ImageBox width="150px" height="150px" src={eval_imagePath}></ImageBox>
            <ArtistDetailInfo albumInfo={albumInfo}></ArtistDetailInfo>
        </Container>
    )
}

export default React.memo(ArtistDetailHeader)