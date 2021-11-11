import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import LinkArtist from 'Components/Links/LinkArtist';
import useSongsInAlbum from 'hooks/useSongsInAlbum';

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
    const {receipt_no, headers=[], ...rest} = props;
    // console.log('### in SongItemHeaderInAlbumDetail: ', receipt_no)
    const {toggleAllSongChecked, allChecked=false} = useSongsInAlbum(receipt_no);
    return (
            <Container>
                <SmallCheckBox checked={allChecked} setChecked={toggleAllSongChecked} />
                <Box flex="1">
                    {/* 순번 */}
                    <TextBox text={headers[0]} {...rest} cursor="auto"></TextBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox containerProps={{marginRight:"15px"}} text={headers[1]} {...rest}></TextBox>
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    <LinkArtist artist={headers[2]} {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={headers[3]} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={headers[4]} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
            </Container>
    )
}

export default React.memo(SongItemHeaderInAlbumDetail)
