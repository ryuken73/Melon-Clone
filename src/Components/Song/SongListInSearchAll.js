import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongIteminSearchAll from './SongIteminSearchAll';
import Divider from '../Common/Divider';
import RenderIfVisible from 'Components/Common/RenderIfVisible'
// import RenderIfVisible from 'react-render-if-visible';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongListInSearchAll = props => {
    const {songs, rootRef, scrollRefTime} = props;
    // const root = React.useMemo(() => {console.log('rootRef changed'); return rootRef ? rootRef.current : null}, [rootRef])
    console.log('^^:',rootRef, scrollRefTime)
    const {mr="15px"} = props;
    const {renderIfVisible=true} = props;
    return (
        <Container>
            {songs.map((song, index) => (
                renderIfVisible ? (
                    <RenderIfVisible key={song.id} root={rootRef ? rootRef.current:null} defaultHeight={55} visibleOffset={1500}>
                        <Box px="10px">
                            <SongIteminSearchAll
                                rownum={index}
                                fontSize="13px"
                                color="white"
                                song={song}
                                width="100%"
                            ></SongIteminSearchAll>
                            <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                        </Box>
                    </RenderIfVisible>

                ):(
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
                )
            ))}
        </Container>
    )
}

export default React.memo(SongListInSearchAll)
// export default SongListInSearchAll
