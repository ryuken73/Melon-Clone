import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongItemWithIndex from './SongItemWithIndex';
import Divider from '../Common/Divider';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`


const SongItemsWithIndex = props => {
    const {songs} = props;
    const {mr="15px"} = props;
    // console.log('###', songs)
    return (
        <Container>
            <SongItemWithIndex
                header={true}
                cursor="auto"
                cellValues={['순번', '곡명', '아티스트', '버전', '재생시간']}
            ></SongItemWithIndex>
            <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
            <ScrollBarWithColor autoHide style={{ width:'100%', height: 'calc(100vh - 370px)' }}>
                {songs.map((song, index) => (
                    <Box key={song[0]}>
                        <SongItemWithIndex
                            fontSize="14px"
                            color="white"
                            cellValues={[...song]}
                            // width="fit-content"
                            width="100%"
                        ></SongItemWithIndex>
                        <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                    </Box>
                ))}
            </ScrollBarWithColor>
        </Container>
    )
}

export default React.memo(SongItemsWithIndex)
