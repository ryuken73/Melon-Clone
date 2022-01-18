import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import ArchiveBoraPlayButton from 'Components/Portal/Archive/ArchiveBoraPlayButton'
import ArchiveBoraDownloadButton from 'Components/Archive/ArchiveBoraDownloadButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import HoverButton from '../Common/ButtonHover';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import colors from 'config/colors';
import useDebounce from 'hooks/useDebounce';
import useDownloadSong from 'hooks/useDownloadSong';
import {withRouter} from 'react-router-dom';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 55px;
        width: 100%;
        background: ${props => props.checked ? colors.playerLight3 : 'transparent'};
        &:hover {
            background: ${colors.playerLight2}
        }
    }
`

const ArchiveListItem = props => {
    const {item:archive, rownum, isSearchResult=false, history, ...rest} = props;
    const [hovered, setHovered] = React.useState(false);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {checked, addChecked, delChecked} = useSongHelper(archive.id);
    const downloadFile = useDownloadSong([archive]);
    const onHovered = React.useCallback(()=>{
        setHovered(true);
    },[setHovered])

    const onHoverOut = React.useCallback(()=>{
        setHovered(false);
    },[setHovered])
    const onChecked = React.useCallback(() => {
        if(checked){
            delChecked(archive);
        } else {
            addChecked(archive)
        }
    },[addChecked, delChecked, archive, checked])
    const addSongNPlay = React.useCallback(() => {
        addSongsToCurrentPlaylist(archive, true);
    },[archive, addSongsToCurrentPlaylist]);

    const addSong = React.useCallback(() => {
        addSongsToCurrentPlaylist(archive);
    },[archive, addSongsToCurrentPlaylist]);

    const downloadSong = React.useCallback(() => {
        downloadFile([archive])
    },[downloadFile, archive])
    const deboucedHovered = useDebounce(hovered, 100);
    const {
        pgm_cd,
        pgm_nm,
        brd_dd_with_weekday,
        episode,
        dj,
        artist,
        bora_archive_yn,
        media_id
    } = archive;
    const alignRownum = isSearchResult ? 'flext-start':'center';
    const fontSizeRownum = isSearchResult ? '14px':'12px';
    const fontSizeBrdDD = isSearchResult ? '12px':'14px';
    const flexRownum = isSearchResult ? '2':'1';
    const flexArtist = isSearchResult ? '1':'2';
    const handleOnClickPgmNM = React.useCallback(() => {
        history.push(`/archive/${pgm_cd}/archiveList`, {pgm_cd})
    },[pgm_cd, history])

    return (
        <Container hovered={deboucedHovered} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
            <SmallCheckBox checked={checked} setChecked={onChecked} />
            <Box flex={flexRownum} display="flex" justifyContent={alignRownum}>
                <TextBox text={rownum+1}></TextBox>
                {isSearchResult && <TextBox clickable onClick={handleOnClickPgmNM} fontSize={fontSizeRownum} text={`.${pgm_nm}`}></TextBox>}
            </Box>
            <Box width="150px">
                <TextBox fontSize={fontSizeBrdDD} color="white" text={brd_dd_with_weekday}></TextBox>
            </Box>
            <Box width="50px">
                <TextBox text={episode}></TextBox>
            </Box>
            <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                <TextBox text={dj}></TextBox>
                {deboucedHovered && (
                    <Box flexShrink="1" minWidth="150px" ml="auto" mr="20px">
                        <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                        <HoverButton onClick={downloadSong}><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                        <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                    </Box>
                )}
            </Box>
            <Box flex={flexArtist}>
                <TextBox text={artist || "-"}></TextBox>
            </Box>
            <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                <TextBox color={bora_archive_yn === 'Y' && 'yellow'} text={bora_archive_yn}></TextBox>
                {deboucedHovered && bora_archive_yn === 'Y' && (
                    <Box flexShrink="1" minWidth="150px" ml="auto" mr="20px">
                            <HoverButton>
                                <ArchiveBoraPlayButton media_id={media_id} archive={archive} size="medium"></ArchiveBoraPlayButton>
                            </HoverButton>
                            <HoverButton>
                                <ArchiveBoraDownloadButton media_id={media_id} archive={archive} size="medium"></ArchiveBoraDownloadButton>
                            </HoverButton>
                            {/* <HoverButton onClick={downloadSong}><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton> */}
                            <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default React.memo(withRouter(ArchiveListItem));