import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import ProgramPageBar from 'Components/Archive/ProgramPageBar';
import ProgramList from 'Components/Archive/ProgramList';
// import SearchResultAll from './SearchResultAll';
// import SearchResultSongs from './SearchResultSongs';
// import SearchResultAlbums from './SearchResultAlbums';
// import SearchResultArtists from './SearchResultArtists';
// import SearchResultLyrics from './SearchResultLyrics';
import SongHelper from 'Components/SongHelper';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`
const SubContainer = styled(Box)`
    margin-top: 10px;
`

function ProgramPage(props) {
    const {match} = props;
    const {category} = match.params;
    return (
        <Container>
            <ProgramPageBar></ProgramPageBar>
            <SubContainer>
                <Switch>
                    <Route path='/program/:category' render={routerprops => <ProgramList {...routerprops} category={category}></ProgramList>}></Route>
                </Switch>
            </SubContainer>
        </Container>
    )
}

export default React.memo(withRouter(ProgramPage));