import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';
// import useSongsInAlbum from 'hooks/useSongsInAlbum';
import useSongHelper from 'hooks/useSongHelper';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 55px;
        width: 100%;
        background: transparent;
    }
`

const SongItemHeaderInAlbumDetail = props => {
    const {songs, ...rest} = props;
    const {toggleAllSongChecked, isAllChecked} = useSongHelper();
    const toggleAllChecked = React.useCallback(checked => {
        toggleAllSongChecked(songs);
    },[songs, toggleAllSongChecked])
    const allChecked = React.useMemo(() => {
        return isAllChecked(songs)
    },[isAllChecked, songs]);
    return (
            <Container>
                <SmallCheckBox checked={allChecked} setChecked={toggleAllChecked} />
                <Box flex="1">
                    {/* 순번 */}
                    <TextBox text={"순번"} {...rest}></TextBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox clickable containerProps={{marginRight:"15px"}} text={"곡명"} {...rest}></TextBox>
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <LinkArtist artist={"아티스트"} {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={"버전"} {...rest} color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={"재생시간"} {...rest} color="darkgrey"></TextBox>
                </Box>
            </Container>
    )
}

export default React.memo(SongItemHeaderInAlbumDetail)
