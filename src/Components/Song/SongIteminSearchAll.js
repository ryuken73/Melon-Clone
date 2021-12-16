import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import ImageBox from 'Components/Common/ImageBox';
import colors from '../../config/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import HoverButton from '../Common/ButtonHover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {secondsToTime} from 'lib/util'
import LinkArtist from 'Components/Links/LinkArtist';
import useSongsInAlbum from 'hooks/useSongsInAlbum';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import useDebounce from 'hooks/useDebounce';
import useDownloadSong from 'hooks/useDownloadSong';

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

const SongIteminSearchAll = props => {
    const {song, rownum, ...rest} = props;
    const [hovered, setHovered] = React.useState(false);
    const {addSongToCurrentPlaylist} = useCurrentPlaylist();
    const {checked, addChecked, delChecked} = useSongHelper(song.id);
    const downloadFile = useDownloadSong([song]);

    const onHovered = React.useCallback(()=>{
        setHovered(true);
    },[setHovered])

    const onHoverOut = React.useCallback(()=>{
        setHovered(false);
    },[setHovered])

    const deboucedHovered = useDebounce(hovered, 100);

    const {id, song_name, song_name_bold, artist, artist_bold, artist_matched, release_year, version, duration, runtime, src, albumImageSrc} = song;

    const onChecked = React.useCallback(() => {
        if(checked){
            delChecked(song);
        } else {
            addChecked(song)
        }
    },[addChecked, delChecked, song, checked])

    const addSongNPlay = React.useCallback(() => {
        addSongToCurrentPlaylist(song, true);
    },[song, addSongToCurrentPlaylist]);

    const addSong = React.useCallback(() => {
        addSongToCurrentPlaylist(song);
    },[song, addSongToCurrentPlaylist]);

    const downloadSong = React.useCallback(() => {
        downloadFile([song])
    },[downloadFile, song])

    const songIndex = React.useMemo(() => rownum+1, [rownum]);

    return (
            <Container checked={checked} hovered={deboucedHovered} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
                <SmallCheckBox checked={checked} setChecked={onChecked} />
                <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                    {/* Small Album Image */}
                    {/* <TextBox text={rownum} {...rest} cursor="auto"></TextBox> */}
                    <TextBox text={songIndex} {...rest} fontSize="10px" marginRight="10px" cursor="auto" color="darkgrey"></TextBox>
                    <ImageBox lazyLoading={false} src={albumImageSrc} width="40px" height="40px"></ImageBox>
                </Box>
                <Box flex="4" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox preserveHtmlTag containerProps={{marginRight:"15px"}} text={song_name_bold} {...rest}></TextBox>
                    {deboucedHovered && (
                        <Box flexShrink="0" width="150px" ml="auto" mr="20px">
                            <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                            <HoverButton onClick={downloadSong}><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                            <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                        </Box>
                    )}
                </Box>
                <Box width="10%">
                    {/* 발매일 */}
                    <TextBox text={`${release_year}년`} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <LinkArtist artist={artist_bold} matched={artist_matched} preserveHtmlTag {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={version} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={duration} {...rest} cursor="auto" color="darkgrey"></TextBox> 
                    {deboucedHovered && (
                        <Box ml="auto">
                            <HoverButton><MoreVertIcon fontSize="small"></MoreVertIcon></HoverButton>
                        </Box>
                    )}
                </Box>
            </Container>
            
    )
}

export default React.memo(SongIteminSearchAll)
