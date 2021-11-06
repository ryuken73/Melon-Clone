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
    background: ${colors.player};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PlayList = () => {
    const [activeTabId, setActiveTabId] = React.useState('song');
    return (
        <Container>
            <TabHeader
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
            ></TabHeader>
            <SongHeader></SongHeader>
            <SongList></SongList>
            <Helper></Helper>
        </Container>
    )
}

export default React.memo(PlayList);
