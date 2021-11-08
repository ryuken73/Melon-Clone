import React from 'react';
import Box from '@mui/material/Box';
import SnackBar from 'Components/Common/SnackBar'
import styled from 'styled-components';
import TextBox from 'Components/Common/TextBox';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HoverButton from 'Components/Common/ButtonHover';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';

const ButtonContainer = styled(Box)`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;
`
const Helper = props => {
    const [currentPlaylist, checkedCount, removeFromCurrentPlaylist] = useCurrentPlaylist();
    console.log('####: checkedCount;', currentPlaylist, checkedCount)
    const hidden = checkedCount === 0;
    const text = `선택한 ${checkedCount} 곡을`;
    const handleDelete = React.useCallback(() => {
        removeFromCurrentPlaylist();
    },[])
    return (
        <SnackBar hidden={hidden}>
            <Box flex="1" justifyContent="center">
                <TextBox textAlign="center" text={text}></TextBox>
            </Box>
            <ButtonContainer>
                <HoverButton><FileDownloadIcon fontSize="small"></FileDownloadIcon></HoverButton>
                <HoverButton><AddIcon fontSize="small"></AddIcon></HoverButton>
                <HoverButton><DeleteIcon onClick={handleDelete} fontSize="small"></DeleteIcon></HoverButton>
            </ButtonContainer>     
        </SnackBar>
    )
}

export default React.memo(Helper)