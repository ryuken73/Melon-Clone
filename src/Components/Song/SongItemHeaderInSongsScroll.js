import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';
import OrderableBox from 'OrderableBox';
import useSongHelper from 'hooks/useSongHelper';
import AnimatedNumber from 'Components/Common/AnimatedNumber';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

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
const NumberContainer = styled(Box)`
    font-size: 10px;
    cursor: auto;
    color: darkgrey;
`
const SongItemHeaderInSongScroll = props => {
    const {songs, total, ...rest} = props;
    const {showShortArchiveList} = useMediaQueryEasy()
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
                    <NumberContainer>
                        <AnimatedNumber from={0} to={songs.length || 0}></AnimatedNumber>
                    </NumberContainer>
                    <TextBox text={`/`} {...rest} color="darkgrey"></TextBox>
                    <NumberContainer>
                        <AnimatedNumber from={0} to={total || 0}></AnimatedNumber>
                    </NumberContainer>
                </Box>
                <OrderableBox page="songList" orderByString="order by song_name_str" flex="3" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox clickable containerProps={{marginRight:"15px"}} text="곡명" {...rest}></TextBox>
                </OrderableBox>
                <OrderableBox page="songList" orderByString="order by album_name_str" width="25%">
                    {/* 앨범 */}
                    <TextBox clickable containerProps={{marginRight:"15px"}} text="앨범명" {...rest}></TextBox>
                </OrderableBox>
                {/* <OrderableBox page="songList" orderByString="order by release_year" width="5%" display={showShortArchiveList ? "none":"flex"} flexDirection="row" alignItems="center"> */}
                <OrderableBox page="songList" orderByString="order by release_year" width="5%" display={"flex"} flexDirection="row" alignItems="center">
                    {/* 발매일 */}
                    <TextBox clickable containerProps={{marginRight:"15px"}} text="발매일" {...rest}></TextBox>
                </OrderableBox>
                <OrderableBox page="songList" orderByString="order by artist_str" width="15%" ml="5px">
                    {/* 아티스트 */}
                    <TextBox clickable text="아티스트" {...rest} color="darkgrey"></TextBox>
                </OrderableBox>
                <OrderableBox page="songList" orderByString="order by version_str" width="10%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox clickable text="버전" {...rest}  color="darkgrey"></TextBox>
                </OrderableBox>
                <OrderableBox clickable page="songList" orderByString="order by runtime" width="10%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text="재생시간" {...rest} color="darkgrey"></TextBox>
                </OrderableBox>
            </Container>
    )
}

export default React.memo(SongItemHeaderInSongScroll)
