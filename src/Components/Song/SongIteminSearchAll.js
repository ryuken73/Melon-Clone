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
import LinkAlbum from 'Components/Links/LinkAlbum';
import useSongsInAlbum from 'hooks/useSongsInAlbum';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import useDebounce from 'hooks/useDebounce';
import useDownloadSong from 'hooks/useDownloadSong';
import {withRouter} from 'react-router-dom';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

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
    const {history} = props;
    const {item:song, rownum, ...rest} = props;
    const [hovered, setHovered] = React.useState(false);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    // const {showShortArchiveList} = useMediaQueryEasy()
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
        addSongsToCurrentPlaylist(song, true);
    },[song, addSongsToCurrentPlaylist]);

    const addSong = React.useCallback(() => {
        addSongsToCurrentPlaylist(song);
    },[song, addSongsToCurrentPlaylist]);

    const downloadSong = React.useCallback(() => {
        downloadFile([song])
    },[downloadFile, song])

    const gotoAlbumInfo = React.useCallback(() => {
    history.push(`/album/${song.receipt_no}/songList`, {receipt_no:song.receipt_no})

    },[history, song.receipt_no])

    const songIndex = React.useMemo(() => rownum+1, [rownum]);

    return (
            <Container checked={checked} hovered={deboucedHovered} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
                <SmallCheckBox checked={checked} setChecked={onChecked} />
                <Box flex="1" mr="5px" flexShrink="0" display="flex" justifyContent="center" alignItems="center">
                    {/* Small Album Image */}
                    <TextBox text={songIndex} {...rest} fontSize="10px" marginRight="10px" color="darkgrey"></TextBox>
                    <ImageBox onClick={gotoAlbumInfo} lazyLoading={false} src={albumImageSrc} width="35px" height="35px"></ImageBox>
                </Box>
                <Box flex="3" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox preserveHtmlTag containerProps={{marginRight:"16px"}} text={song_name_bold} {...rest} color="darkgrey"></TextBox>
                    {deboucedHovered && (
                        <Box flexShrink="1" minWidth="150px" ml="auto" mr="20px">
                            <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                            <HoverButton onClick={downloadSong}><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                            <HoverButton onClick={addSong}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                        </Box>
                    )}
                </Box>
                <Box width="25%">
                    <LinkAlbum album_name={song.album_name} receipt_no={song.receipt_no}></LinkAlbum>
                </Box>
                {/* <Box width="5%" display={showShortArchiveList ? "none":"flex"}> */}
                <Box width="5%" display={"flex"}>
                    {/* 발매일 */}
                    <TextBox text={release_year ? `${release_year}년`:''} {...rest} color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" ml="5px">
                    {/* 아티스트 */}
                    <LinkArtist artist={artist_bold} matched={artist_matched} preserveHtmlTag {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="10%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={version} {...rest} color="darkgrey"></TextBox>
                </Box>
                <Box width="10%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={duration} {...rest} color="darkgrey"></TextBox> 
                    {deboucedHovered && (
                        <Box ml="auto">
                            <HoverButton><MoreVertIcon fontSize="small"></MoreVertIcon></HoverButton>
                        </Box>
                    )}
                </Box>
            </Container>
            
    )
}

export default React.memo(withRouter(SongIteminSearchAll))
