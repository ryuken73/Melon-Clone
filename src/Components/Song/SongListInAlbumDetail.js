import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongItemAlbumDetail from './SongIteminAlbumDetail';
import SongItemHeaderInAlbumDetail from './SongItemHeaderInAlbumDetail';
import Divider from '../Common/Divider';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

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
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <Container>
            <SongItemHeaderInAlbumDetail
                // receipt_no={receipt_no}
                songs={songs}
                // headers={['순번', '곡명', '아티스트', '버전', '재생시간']}
            ></SongItemHeaderInAlbumDetail>
            <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
            {/* <ScrollBarWithColor autoHide style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 370px)`}}> */}
            <ScrollBarSmooth
                height={`calc(${fullViewHeightMediaQuery} - 370px)`}
            >
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
            </ScrollBarSmooth>
            {/* </ScrollBarWithColor> */}
        </Container>
    )
}

export default React.memo(SongListInAlbumDetail)
