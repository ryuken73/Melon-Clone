import React from 'react';
import Box from '@mui/material/Box';
import SnackBar from 'Components/Common/SnackBar'
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import HoverButton from 'Components/Common/ButtonHover';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import useSongsInAlbum from 'hooks/useSongsInAlbum';
import colors from 'config/colors';

const ButtonContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`
const Helper = props => {
    const {receipt_no} = props;
    const {songsInAlbum, checkedCount=0, addSongChecked} = useSongsInAlbum(receipt_no);
    console.log('####: checkedCount;', songsInAlbum, checkedCount)
    const hidden = checkedCount === 0 || checkedCount === false;
    const text = `선택한 ${checkedCount} 곡을`;
    const handleAddCurrentPlaylist = React.useCallback(() => {
        addSongChecked();
    },[])
    return (
        <SnackBar hidden={hidden} containerProps={{width:'300px', height:'40px', bgcolor:colors.light3CenterPane}}>
            <Box flex="1" justifyContent="center">
                <TextBox fontSize="15px" textAlign="center" color="white" text={text}></TextBox>
            </Box>
            <ButtonContainer>
                <HoverButton><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                <HoverButton><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                <HoverButton><AddIcon fontSize="medium"></AddIcon></HoverButton>
            </ButtonContainer>     
        </SnackBar>
    )
}

export default React.memo(Helper)
