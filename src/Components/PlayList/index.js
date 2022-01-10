import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import TabHeader from './TabHeader';
import SongList from './SongList';
import SongHeader from './SongHeader';
import Helper from './Helper';

const Container = styled(Box)`
    position: relative;
    background: ${props => props.mode === 'flat' ? colors.playerLight1 : colors.player};
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`
const PlayList = props => {
    const {hide=false, mode} = props;
    const [activeTabId, setActiveTabId] = React.useState('song');
    return (
        <Container mode={mode}>
            <TabHeader
                hide={hide}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
            ></TabHeader>
            <SongHeader hide={hide}></SongHeader>
            <SongList hide={hide}></SongList>
            <Helper></Helper>
        </Container>
    )
}

export default React.memo(PlayList);
