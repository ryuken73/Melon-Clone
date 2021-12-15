import React from 'react';
import Box from '@mui/material/Box';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import CenterHeaderNav from './CenterHeaderNav';
import AutoComplete from './Components/Common/AutoComplete';

const Container = styled(Box)`
    display: flex;
    padding: 5px;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    margin-bottom: 15px;
`
const CenterHeader = props => {
    const [historyPushedCount, setHistoryPushedCount] = React.useState(0);

    return (
        <Container>
            <CenterHeaderNav historyPushedCount={historyPushedCount} setHistoryPushedCount={setHistoryPushedCount}></CenterHeaderNav>
            <AutoComplete></AutoComplete>
        </Container>
    )
}

export default withRouter(CenterHeader);
