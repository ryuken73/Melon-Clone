import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import colors from '../../config/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import HoverButton from '../Common/ButtonHover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {secondsToTime} from 'lib/util'
import LinkArtist from 'Components/Links/LinkArtist';
import useSongsInAlbum from 'hooks/useSongsInAlbum';

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

const SongItemAlbumDetail = props => {
    const {song, receipt_no, ...rest} = props;
    const [hovered, setHovered] = React.useState(false);
    const onHovered = React.useCallback(()=>{
        setHovered(true);
    },[setHovered])
    const onHoverOut = React.useCallback(()=>{
        setHovered(false);
    },[setHovered])
    // console.log('###', cellValues)
    const {rownum, song_name, artist, version, runtime, checkedSongList, src, albumImageSrc} = song;
    const duration = isNaN(parseInt(runtime)) ? runtime:secondsToTime(runtime)
    const {addSongByRownum, addSongByRownumNPlay, toggleSongChecked} = useSongsInAlbum(receipt_no, rownum);
    const onChecked = React.useCallback(() => {
        toggleSongChecked()
    },[toggleSongChecked])
    const addSongNPlay = React.useCallback(() => {
        addSongByRownumNPlay(src, albumImageSrc)
    },[src, albumImageSrc, addSongByRownumNPlay ])

    return (
            <Container checked={checkedSongList} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
                <SmallCheckBox checked={checkedSongList} setChecked={onChecked} />
                <Box flex="1">
                    {/* 순번 */}
                    <TextBox text={rownum} {...rest} cursor="auto"></TextBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox containerProps={{marginRight:"15px"}} text={song_name} {...rest}></TextBox>
                    {hovered && (
                        <Box flexShrink="0" width="150px" ml="auto" mr="20px">
                            <HoverButton onClick={addSongNPlay}><PlayArrowIcon fontSize="medium"></PlayArrowIcon></HoverButton>
                            <HoverButton><FileDownloadIcon fontSize="medium"></FileDownloadIcon></HoverButton>
                            <HoverButton onClick={addSongByRownum}><AddIcon fontSize="medium"></AddIcon></HoverButton>
                        </Box>
                    )}
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <LinkArtist artist={artist} {...rest} color="darkgrey"></LinkArtist>
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

export default React.memo(SongItemAlbumDetail)
