import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';
import useSongHelper from 'hooks/useSongHelper';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 55px;
        background: transparent;
        padding-right: 10px;
        padding-left: 10px;
    }
`

const SongItemHeaderInSongScroll = props => {
    const {songs, total, ...rest} = props;
    // console.log('### in SongItemHeaderInAlbumDetail: ', receipt_no)
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
                <Box flex="1" display="flex" justifyContent="center">
                    <TextBox text={`(${songs.length}/${total})`} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox containerProps={{marginRight:"15px"}} text="곡명" {...rest}></TextBox>
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <TextBox text="아티스트" {...rest} color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text="버전" {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text="재생시간" {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
            </Container>
    )
}

export default React.memo(SongItemHeaderInSongScroll)
