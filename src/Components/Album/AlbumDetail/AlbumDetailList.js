import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from 'config/colors';
import ButtonIcon from 'Components/Common/ButtonIcon';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongListInAlbumDetail from 'Components/Song/SongListInAlbumDetail';
import useSongsInAlbum from 'hooks/useSongsInAlbum';
import Helper from './Helper';

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
    const {
        songsInAlbum, 
        toggleAllSongChecked, 
        addAllSongsInAlbum,
        playFirstSongInAlbum
    } = useSongsInAlbum(receipt_no);

    const addAllSongNPlay = React.useCallback(() => {
        addAllSongsInAlbum();
        playFirstSongInAlbum();
    },[addAllSongsInAlbum, playFirstSongInAlbum])

    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon 
                    text="전체선택" 
                    iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                    onClick={toggleAllSongChecked}
                ></ButtonIcon>
                <ButtonIcon 
                    text="전체재생" 
                    iconComponent={<PlayArrowIcon fontSize="small"></PlayArrowIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                    onClick={addAllSongNPlay}
                ></ButtonIcon>
            </ButtonContainer>
            <SongListInAlbumDetail
                songs={songsInAlbum}
                receipt_no={receipt_no}
            ></SongListInAlbumDetail>
            <Helper receipt_no={receipt_no}></Helper>
        </Container>
    )
}

export default React.memo(AlbumDetailList)