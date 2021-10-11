import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';
import TabHeader from './TabHeader';
import SongBox from './SongBox';
import SnackBar from '../Common/SnackBar';

const Container = styled(Box)`
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
            <SongBox></SongBox>
            <SnackBar></SnackBar>
        </Container>
    )
}

export default React.memo(PlayList);
