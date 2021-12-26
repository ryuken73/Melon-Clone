import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import colors from 'config/colors';
import usePlayerState from 'hooks/usePlayerState';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 270px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Image = styled(Box)`
    margin-top: 50px;
`;
const Title = styled(Box)`
    margin-top: 10px;
    align-self: center;
    max-width: 200px;
`;
const Artist = styled(Box)`
    align-self: center;
    margin-top: 5px;
    max-width: 200px;
`;

function Skin(props) {
    const {song={}} = usePlayerState();
    const {
        albumImageSrc='',
        song_name="곡명",
        artist="아티스트",
        getFileSizeParams='',
        currentPlaying=false,
    } = song;
    const width = getFileSizeParams === 'archive' ? '150px':'150px';
    const objectFit = getFileSizeParams === 'archive' ? 'contain':'cover';
    return (
        <Container>
            <Image>
                <ImageBox src={albumImageSrc} objectFit={objectFit} width={width} height="150px"></ImageBox>
            </Image>
            <Title>
                <TextBox textalign="center" fontSize="13px" text={song_name} color={currentPlaying ? 'yellow':colors.textMain}></TextBox>
            </Title>
            <Artist>
                <TextBox textalign="center" text={artist}></TextBox>
            </Artist>
        </Container>
    );
}

export default React.memo(Skin);