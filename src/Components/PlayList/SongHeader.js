import React from 'react'
import Box from '@mui/material/Box';
import RepeatIcon from '@mui/icons-material/Repeat';
import styled from 'styled-components';
import TextBox from '../Common/TextBox';
import SmallCheckBox from '../Common/CheckBox';
import HoverButton from '../Common/ButtonHover';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 30px;
        width: 100%;
    }
`

const SongHeader = props => {

    const [checked, setChecked] = React.useState(false);
    const onClickRepeat = () => {};

    return (
        <Container>
            <SmallCheckBox checked={checked} setChecked={setChecked} />
            <Box display="flex" alignItems="center" ml="auto" mr="10px" width="90px">
                <TextBox textalign="right" text="반복재생"></TextBox>
                <HoverButton onClick={onClickRepeat}><RepeatIcon fontSize="small"></RepeatIcon></HoverButton>
            </Box>

     
        </Container>
    )
}

export default React.memo(SongHeader)
