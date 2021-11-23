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
    // const {song, checked=false, rownum, toggleChecked=()=>{}, ...rest} = props;
    const {song, rownum, ...rest} = props;
    const [hovered, setHovered] = React.useState(false);
    const {addSongToCurrentPlaylist} = useCurrentPlaylist();
    const {checked, addChecked, delChecked} = useSongHelper(song.id);
    // console.log('&&&&&:', allChecked, addSongToCurrentPlaylist)
    const onHovered = React.useCallback(()=>{
        setHovered(true);
    },[setHovered])
    const onHoverOut = React.useCallback(()=>{
        setHovered(false);
    },[setHovered])
    // console.log('###', cellValues)
    const {id, song_name, song_name_bold, artist, artist_bold, version, duration, runtime, src, albumImageSrc} = song;
    // console.log(id, song_name, artist, version, duration, runtime, src, albumImageSrc)
    // const {addSongByRownum, addSongByRownumNPlay, toggleSongChecked} = useSongsInAlbum(receipt_no, rownum);

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

    return (
            <Container checked={checked} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
                <SmallCheckBox checked={checked} setChecked={onChecked} />
                <Box flex="1">
                    {/* Small Album Image */}
                    {/* <TextBox text={rownum} {...rest} cursor="auto"></TextBox> */}
                    <ImageBox src={albumImageSrc} width="30px" height="30px"></ImageBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox preserveHtmlTag containerProps={{marginRight:"15px"}} text={song_name_bold} {...rest}></TextBox>
                    {hovered && (
                        <Box flexShrink="0" width="150px" ml="auto" mr="20px">
                            <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                            <HoverButton><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                            <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                        </Box>
                    )}
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <LinkArtist artist={artist_bold} preserveHtmlTag {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={version} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={duration} {...rest} cursor="auto" color="darkgrey"></TextBox>
                    {hovered && (
                        <Box ml="auto">
                            <HoverButton><MoreVertIcon fontSize="small"></MoreVertIcon></HoverButton>
                        </Box>
                    )}
                </Box>
            </Container>
            
    )
}

export default React.memo(SongIteminSearchAll)
