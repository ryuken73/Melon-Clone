import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongIteminSearchAll from './SongIteminSearchAll';
import Divider from '../Common/Divider';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongListInSearchAll = props => {
    const {songs} = props;
    const {mr="15px"} = props;
    return (
        <Container>
            {songs.map((song, index) => (
                <Box key={song.rownum} px="10px">
                    <SongIteminSearchAll
                        rownum={index}
                        fontSize="14px"
                        color="white"
                        song={song}
                        width="100%"
                    ></SongIteminSearchAll>
                    <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                </Box>
            ))}
        </Container>
    )
}

export default React.memo(SongListInSearchAll)
