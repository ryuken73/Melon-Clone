import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import PodcastProgramPageBar from 'Components/Podcast/PodcastProgramPageBar';
import PodcastProgramList from 'Components/Podcast/PodcastProgramList';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`
function PodcastProgramPage(props) {
    const {match} = props;
    const {category} = match.params;
    return (
        <Container>
            <PodcastProgramPageBar></PodcastProgramPageBar>
                <Switch>
                    <Route path='/podcastProgram/:category' render={routerprops => <PodcastProgramList {...routerprops} category={category}></PodcastProgramList>}></Route>
                </Switch>
        </Container>
    )
}

export default React.memo(withRouter(PodcastProgramPage));