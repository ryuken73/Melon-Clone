import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from 'Components/Common/CheckBox';
import TextBox from 'Components/Common/TextBox';
import PodcastPlayButton from 'Components/Podcast/PodcastPlayButton'
import PodcastDownloadButton from 'Components/Podcast/PodcastDownloadButton'
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

const PodcastListItem = props => {
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
        id,
        pgm_cd,
        pgm_nm,
        brad_day_with_weekday,
        episode,
        dj,
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
            <Box width="50px" display="flex" justifyContent={alignRownum}>
                <TextBox text={rownum+1}></TextBox>
                {isSearchResult && <TextBox clickable onClick={handleOnClickPgmNM} fontSize={fontSizeRownum} text={`.${pgm_nm}`}></TextBox>}
            </Box>
            <Box flex="1">
                <TextBox fontSize={fontSizeBrdDD} color="white" text={brad_day_with_weekday}></TextBox>
            </Box>
            <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                <TextBox fontSize={fontSizeBrdDD} text={episode}></TextBox>
                {deboucedHovered && (
                    <Box flexShrink="0" minWidth="150px" ml="auto" mr="20px">
                        <HoverButton>
                            <PodcastPlayButton media_id={id} podcast={archive} size="medium"></PodcastPlayButton>
                        </HoverButton>
                        <HoverButton>
                            <PodcastDownloadButton media_id={id} podcast={archive} size="medium"></PodcastDownloadButton>
                        </HoverButton>
                        <HoverButton>
                            <PodcastPlayButton media_id={id} podcast={archive} playAfterAdd={false} size="medium"></PodcastPlayButton>
                        </HoverButton>
                        {/* <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                        <HoverButton onClick={downloadSong}><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                        <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton> */}
                    </Box>
                )}
            </Box>
            <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                <TextBox containerProps={{width:'100%', textalign:'center'}} text={dj}></TextBox>
            </Box>
        </Container>
    )
}

export default React.memo(withRouter(PodcastListItem));