import React from 'react'
import Box from '@mui/material/Box';
import ButtonIcon from 'Components/Common/ButtonIcon';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import ButtonColorIcon from 'Components/Common/ButtonColorIcon';
import LinkArtist from 'Components/Links/LinkArtist';
import OrderableBox from 'OrderableBox';
import useAppState from 'hooks/useAppState';
import useSongHelper from 'hooks/useSongHelper';
import AnimatedNumber from 'Components/Common/AnimatedNumber';

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
const StyledButtonIcon = styled(ButtonIcon)`
    && { 
        padding: 0px;
        color: yellow !important;
        font-size: 15px;
        font-weight: bold;
    }
}
`
const SongItemHeaderInSongScroll = props => {
    const {songs, total, targetPage, ...rest} = props;
    const {isOrderByDefault, setOrderByDefault} = useAppState();
    const {toggleAllSongChecked, isAllChecked} = useSongHelper();
    const toggleAllChecked = React.useCallback(checked => {
        toggleAllSongChecked(songs);
    },[songs, toggleAllSongChecked])
    const allChecked = React.useMemo(() => {
        return isAllChecked(songs)
    },[isAllChecked, songs]);
    const restoreOrderBy = React.useCallback(() => {
        setOrderByDefault({page: targetPage})
    },[setOrderByDefault, targetPage])

    return (
            <Container sx={{position: 'relative'}} onClick={event => console.log('((',event.target)}>
                {!isOrderByDefault(targetPage) && (
                    <Box position="absolute" onClick={restoreOrderBy} sx={{top:-50, left:550}}>
                        <ButtonColorIcon
                            iconComponent={<SettingsBackupRestoreIcon></SettingsBackupRestoreIcon>}
                            text="기본 정렬로 돌리기"
                        ></ButtonColorIcon>
                    </Box>
                )}
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
                <OrderableBox targetPage={targetPage} orderByString="order by song_name_str" flex="3">
                    {/* 곡명 */}
                    <TextBox clickable containerProps={{marginRight:"5px"}} text="곡명" {...rest}></TextBox>
                </OrderableBox>
                <OrderableBox targetPage={targetPage} orderByString="order by album_name_str" width="25%">
                    {/* 앨범 */}
                    <TextBox clickable containerProps={{marginRight:"5px"}} text="앨범명" {...rest}></TextBox>
                </OrderableBox>
                {/* <OrderableBox page={targetPage} orderByString="order by release_year" width="5%" display={showShortArchiveList ? "none":"flex"} flexDirection="row" alignItems="center"> */}
                <OrderableBox targetPage={targetPage} orderByString="order by release_year" width="5%">
                    {/* 발매일 */}
                    <TextBox clickable containerProps={{marginRight:"5px"}} text="발매일" {...rest}></TextBox>
                </OrderableBox>
                <OrderableBox targetPage={targetPage} orderByString="order by artist_str" width="15%" ml="5px">
                    {/* 아티스트 */}
                    <TextBox clickable text="아티스트" {...rest} color="darkgrey"></TextBox>
                </OrderableBox>
                <OrderableBox targetPage={targetPage} orderByString="order by version_str" width="10%">
                    {/* 버전 */}
                    <TextBox clickable text="버전" {...rest}  color="darkgrey"></TextBox>
                </OrderableBox>
                <OrderableBox clickable targetPage={targetPage} orderByString="order by runtime" width="10%">
                    {/* 재생시간 */}
                    <TextBox text="재생시간" {...rest} color="darkgrey"></TextBox>
                </OrderableBox>
            </Container>
    )
}

export default React.memo(SongItemHeaderInSongScroll)
