import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';
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

const ArchiveListHeader = props => {
    const {archives, total, ...rest} = props;
    const {showShortArchiveList} = useMediaQueryEasy()
    // console.log('### in SongItemHeaderInAlbumDetail: ', receipt_no)
    const {toggleAllSongChecked, isAllChecked} = useSongHelper();
    const toggleAllChecked = React.useCallback(checked => {
        toggleAllSongChecked(archives);
    },[archives, toggleAllSongChecked])
    const allChecked = React.useMemo(() => {
        return isAllChecked(archives)
    },[isAllChecked, archives]);
    return (
            <Container>
                <SmallCheckBox checked={allChecked} setChecked={toggleAllChecked} />
                <Box flex="1" display="flex" justifyContent="center">
                    <NumberContainer>
                        <AnimatedNumber from={0} to={archives.length || 0}></AnimatedNumber>
                    </NumberContainer>
                    <TextBox text={`/`} {...rest} cursor="auto" color="darkgrey"></TextBox>
                    <NumberContainer>
                        <AnimatedNumber from={0} to={total || 0}></AnimatedNumber>
                    </NumberContainer>
                </Box>
                <Box width="150px">
                    <TextBox fontSize="13px" color="white" text={'방송일'}></TextBox>
                </Box>
                <Box width="50px">
                    <TextBox text={"회차"}></TextBox>
                </Box>
                <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                    <TextBox text={"진행자"}></TextBox>
                </Box>
                <Box flex="2">
                    <TextBox text={"출연자"}></TextBox>
                </Box>
                <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                    <TextBox text={"보는라디오"}></TextBox>
                </Box>
            </Container>
    )
}

export default React.memo(ArchiveListHeader)
