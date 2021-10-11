import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TextBox from '../Common/TextBox';
import SmallCheckBox from '../Common/CheckBox';
import colors from '../../config/colors';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 35px;
        &:hover {
            background: ${colors.centerPane}
        }
    }
`

const Song = props => {

    const defaultSong = {
        id: 1,
        title: '제목',
        artist: 'Artist'
    }
    const {song=defaultSong} = props;
    const {id, title, artist} = song;
    const [checked, setChecked] = React.useState(true);

    return (
        <Container>
            <SmallCheckBox checked={checked} setChecked={setChecked} />
            <TextBox text={title} margin="0px 15px 0px 0px" width="150px"></TextBox>
            <TextBox text={artist} width="90px"></TextBox>
        </Container>
    )
}

export default React.memo(Song)
