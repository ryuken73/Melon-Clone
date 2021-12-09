import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from 'config/colors';
import ButtonIcon from 'Components/Common/ButtonIcon';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SongListInAlbumDetail from 'Components/Song/SongListInAlbumDetail';
import SongHelper from 'Components/SongHelper';
import useQueryAlbumInfo from 'hooks/useQueryAlbumInfo';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import createAlbumInfo from 'lib/albumInfoClass';

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
    const result = useQueryAlbumInfo(receipt_no);
    const albumInfo = React.useMemo(() => createAlbumInfo(result.data),[result.data]);
    const songsInAlbum = albumInfo.list_song;
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {clearChecked, toggleAllSongChecked} = useSongHelper();

    const toggleAllChecked = React.useCallback(()=>{
        toggleAllSongChecked(songsInAlbum);
    },[toggleAllSongChecked, songsInAlbum])

    const addAllSongNPlay = React.useCallback(() => {
        addSongsToCurrentPlaylist(songsInAlbum, true);
        clearChecked();
    },[addSongsToCurrentPlaylist, songsInAlbum, clearChecked])

    return (
        <Container>
            <ButtonContainer>
                <ButtonIcon 
                    text="전체선택" 
                    iconComponent={<CheckIcon fontSize="small"></CheckIcon>} 
                    border="1px solid rgba(255, 255, 255, .5)"
                    hoverBorder="1px solid rgba(255, 255, 255, 0.8)"
                    onClick={toggleAllChecked}
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
            {/* <Helper receipt_no={receipt_no}></Helper> */}
            <SongHelper></SongHelper>
        </Container>
    )
}

export default React.memo(AlbumDetailList)