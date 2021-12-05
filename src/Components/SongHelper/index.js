import React from 'react';
import Box from '@mui/material/Box';
import SnackBar from 'Components/Common/SnackBar'
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import HoverButton from 'Components/Common/ButtonHover';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import colors from 'config/colors';
import useSongHelper from '../../hooks/useSongHelper';

const ButtonContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`
const Helper = () => {
    const {checkedSongList, clearChecked} = useSongHelper();
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const checkedCount = checkedSongList.length;
    const hidden = checkedCount === 0 || checkedCount === false;
    const text = `선택한 ${checkedCount} 곡을`;

    const handleAddCurrentPlaylist = React.useCallback(() => {
        addSongsToCurrentPlaylist(checkedSongList);
        clearChecked();
    },[checkedSongList, clearChecked, addSongsToCurrentPlaylist])

    const handleAddCurrentPlaylistNPlay = React.useCallback(() => {
        addSongsToCurrentPlaylist(checkedSongList, true)
        clearChecked();
    },[checkedSongList, clearChecked, addSongsToCurrentPlaylist])

    return (
        <SnackBar hidden={hidden} containerProps={{width:'300px', height:'40px', bgcolor:colors.light3CenterPane}}>
            <Box flex="1" justifyContent="center">
                <TextBox fontSize="15px" textAlign="center" color="white" text={text}></TextBox>
            </Box>
            <ButtonContainer>
                <HoverButton onClick={handleAddCurrentPlaylistNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                <HoverButton><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                <HoverButton onClick={handleAddCurrentPlaylist}><AddIcon fontSize="medium"></AddIcon></HoverButton>
            </ButtonContainer>     
        </SnackBar>
    )
}

export default React.memo(Helper)