import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
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

const ArchiveListHeader = props => {
    const {archives, total, isSearchResult, ...rest} = props;
    // console.log('### in SongItemHeaderInAlbumDetail: ', receipt_no)
    const {toggleAllSongChecked, isAllChecked} = useSongHelper();
    const toggleAllChecked = React.useCallback(checked => {
        toggleAllSongChecked(archives);
    },[archives, toggleAllSongChecked])
    const allChecked = React.useMemo(() => {
        return isAllChecked(archives)
    },[isAllChecked, archives]);
    const alignRownum = isSearchResult ? 'flext-start':'center';
    const flexRownum = isSearchResult ? '2':'1';
    const flexArtist = isSearchResult ? '1':'2';
    return (
            <Container>
                <SmallCheckBox checked={allChecked} setChecked={toggleAllChecked} />
                <Box width="100px" display="flex" justifyContent={alignRownum}>
                    <NumberContainer>
                        <AnimatedNumber from={0} to={archives.length || 0}></AnimatedNumber>
                    </NumberContainer>
                    <TextBox text={`/`} {...rest} color="darkgrey"></TextBox>
                    <NumberContainer>
                        <AnimatedNumber from={0} to={total || 0}></AnimatedNumber>
                    </NumberContainer>
                    {isSearchResult && <TextBox ml="10px" text="프로그램"></TextBox>}
                </Box>
                <Box flex="1">
                    <TextBox fontSize="13px" color="white" text={'방송일'}></TextBox>
                </Box>
                <Box flex="3">
                    <TextBox text={"회차"}></TextBox>
                </Box>
                <Box flex="2" display="flex" flexDirection="row" alignItems="center">
                    <TextBox containerProps={{width:'100%', textalign:'center'}} text={"진행자"}></TextBox>
                </Box>
                {/* <Box flex="2" display="flex" flexDirection="row" alignItems="center"> */}
                    {/* <TextBox text={"보는라디오"}></TextBox> */}
                {/* </Box> */}
            </Container>
    )
}

export default React.memo(ArchiveListHeader)
