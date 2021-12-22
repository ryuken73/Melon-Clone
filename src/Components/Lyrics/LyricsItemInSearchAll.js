import React from 'react'
import Box from '@mui/material/Box';
import TextBox from '../Common/TextBox';
import ImageBox from 'Components/Common/ImageBox';
import LinkArtist from 'Components/Links/LinkArtist';
import styled from 'styled-components';
import Divider from '../Common/Divider';
import useQueryAlbumInfo from 'hooks/useQueryAlbumInfo';
import createAlbumInfo from 'lib/albumInfoClass';

const LyricsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
`
const ImageContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 6;
`

function LyricsItemInSearchAll(props) {
    const {lyrics={}} = props;
    const {
        receipt_no,
        eval_imagePath,
        song_name_bold,
        lyrics_bold
    } = lyrics;
    const result = useQueryAlbumInfo(receipt_no);
    const albumInfo = createAlbumInfo(result.data);
    return (
        <LyricsContainer>
            <Container>
                <ImageContainer>
                    <ImageBox src={eval_imagePath} width="40px" height="40px"></ImageBox>
                    <Box width="10px"></Box>
                    <TextBox preserveHtmlTag text={song_name_bold}></TextBox>
                </ImageContainer>
                <Box flex="2">
                    <LinkArtist preserveHtmlTag artist={albumInfo.artist}></LinkArtist>
                </Box>
                <Box flex="2">
                    <LinkArtist preserveHtmlTag text="앨범 제목"></LinkArtist>
                </Box>
            </Container>
            <Box width="90%" mt="5px">
                <TextBox preserveHtmlTag text={lyrics_bold}></TextBox>
            </Box>
            <Divider margin="0px" opacity="0.2" mt="10px"></Divider>
        </LyricsContainer>
   )
}

export default React.memo(LyricsItemInSearchAll)