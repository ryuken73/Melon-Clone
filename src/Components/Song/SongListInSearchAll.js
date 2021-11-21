import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongIteminSearchAll from './SongIteminSearchAll';
import Divider from '../Common/Divider';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

const SongListInSearchAll = props => {
    const {songs} = props;
    const initialCheckedArray = new Array(songs.length);
    initialCheckedArray.fill(false);
    const [checkedArray, setCheckedArray] = React.useState(initialCheckedArray);
    const {mr="15px"} = props;

    const toggleChecked = React.useCallback(index => {
        setCheckedArray(checkedArray => {
            const newChecked = !checkedArray[index];
            const newCheckedArray = [...checkedArray]
            newCheckedArray[index] = newChecked;
            return newCheckedArray;
        })
    },[setCheckedArray])
    return (
        <Container>
            {/* <ScrollBarWithColor autoHide style={{ width:'100%', height: 'calc(100vh - 370px)' }}> */}
                {songs.map((song, index) => (
                    <Box key={song.rownum}>
                        <SongIteminSearchAll
                            rownum={index}
                            fontSize="14px"
                            color="white"
                            song={song}
                            checked={checkedArray[index]}
                            width="100%"
                            toggleChecked={toggleChecked}
                        ></SongIteminSearchAll>
                        <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                    </Box>
                ))}
            {/* </ScrollBarWithColor> */}
        </Container>
    )
}

export default React.memo(SongListInSearchAll)
