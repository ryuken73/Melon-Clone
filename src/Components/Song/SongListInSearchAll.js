import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongIteminSearchAll from './SongIteminSearchAll';
import Divider from '../Common/Divider';
import RenderIfVisible from 'react-render-if-visible';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongListInSearchAll = props => {
    const {songs, rootRef} = props;
    const root = React.useMemo(() => {return rootRef ? rootRef.current : null}, [rootRef])
    const {mr="15px"} = props;
    return (
        <Container>
            {songs.map((song, index) => (
                <RenderIfVisible root={root} defaultHeight={55} visibleOffset={500}>
                <Box key={song.id} px="10px">
                    <SongIteminSearchAll
                        rownum={index}
                        fontSize="14px"
                        color="white"
                        song={song}
                        width="100%"
                    ></SongIteminSearchAll>
                    <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                </Box>
                </RenderIfVisible>
            ))}
        </Container>
    )
}

export default React.memo(SongListInSearchAll)
