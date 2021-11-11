import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongItemAlbumDetail from './SongIteminAlbumDetail';
import SongItemHeaderInAlbumDetail from './SongItemHeaderInAlbumDetail';
import Divider from '../Common/Divider';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongListInAlbumDetail = props => {
    const {songs, receipt_no} = props;
    const {mr="15px"} = props;
    console.log('in SongListInAlbumDetail:', receipt_no);
    return (
        <Container>
            <SongItemHeaderInAlbumDetail
                cursor="auto"
                receipt_no={receipt_no}
                headers={['순번', '곡명', '아티스트', '버전', '재생시간']}
            ></SongItemHeaderInAlbumDetail>
            <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
            <ScrollBarWithColor autoHide style={{ width:'100%', height: 'calc(100vh - 370px)' }}>
                {songs.map((song, index) => (
                    <Box key={song.rownum}>
                        <SongItemAlbumDetail
                            fontSize="14px"
                            color="white"
                            song={song}
                            receipt_no={receipt_no}
                            width="100%"
                        ></SongItemAlbumDetail>
                        <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                    </Box>
                ))}
            </ScrollBarWithColor>
        </Container>
    )
}

export default React.memo(SongListInAlbumDetail)
