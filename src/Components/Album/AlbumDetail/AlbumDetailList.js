import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from 'config/colors';
import ButtonIcon from 'Components/Common/ButtonIcon';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongItemsWithIndex from 'Components/Song/SongItemsWithIndex';
import useSongsInAlbum from 'hooks/useSongsInAlbum';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
    margin-right: 15px;
`
const ButtonContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    .MuiSvgIcon-root {
        color: ${props => props.color || 'white'};
        opacity: ${props => props.opacitynormal || '0.7'};
    }
`
const AlbumDetailList = props => {
    const {match} = props;
    const {receipt_no} = match.params;
    const songsInAlbum = useSongsInAlbum(receipt_no);

    console.log(songsInAlbum)
    const songs = songsInAlbum.length > 0 ? songsInAlbum.map(song => {
        const {rownum, song_name, artist, version, runtime} = song;
        return [rownum, song_name, artist, version, runtime]
    }) : [];

    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon 
                    text="전체선택" 
                    iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                ></ButtonIcon>
                <ButtonIcon 
                    text="전체재생" 
                    iconComponent={<PlayArrowIcon fontSize="small"></PlayArrowIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                ></ButtonIcon>
            </ButtonContainer>
            <SongItemsWithIndex
                songs={songs}
            ></SongItemsWithIndex>
        </Container>
    )
}

export default React.memo(AlbumDetailList)