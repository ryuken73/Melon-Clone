import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import ProgramPageBar from 'Components/Archive/ProgramPageBar';
import ProgramList from 'Components/Archive/ProgramList';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`
function ProgramPage(props) {
    const {match} = props;
    const {category} = match.params;
    return (
        <Container>
            <ProgramPageBar></ProgramPageBar>
                <Switch>
                    <Route path='/program/:category' render={routerprops => <ProgramList {...routerprops} category={category}></ProgramList>}></Route>
                </Switch>
        </Container>
    )
}

export default React.memo(withRouter(ProgramPage));