import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import TabHeader from './TabHeader';
import SongList from './SongList';
import SongHeader from './SongHeader';
import Helper from './Helper';
import usePlaylistInStorage from 'hooks/usePlaylistInStorage';

const Container = styled(Box)`
    position: relative;
    background: ${props => props.mode === 'flat' ? 'repeating-linear-gradient(20deg, #031126,red 2000px)' : colors.player};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PlayList = props => {
    console.log('^^^ re-render PlayList:', props.mode)
    const {hide=false, mode} = props;
    const [activeTabId, setActiveTabId] = React.useState('song');
    usePlaylistInStorage();
    return (
        <Container mode={mode}>
            {!hide && (
            <TabHeader
                hide={hide}
                mode={mode}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
            ></TabHeader>
            )}
            <SongHeader hide={hide}></SongHeader>
            <SongList hide={hide}></SongList>
            <Helper></Helper>
        </Container>
    )
}

export default React.memo(PlayList);
