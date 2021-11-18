import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import SearchResultBar from './SearchResultBar';
import SearchResultAll from './SearchResultAll';
import SearchResultSongs from './SearchResultSongs';
import SearchResultAlbums from './SearchResultAlbums';
import SearchResultArtists from './SearchResultArtists';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`

function SearchResultPage() {
    return (
        <Container>
            {/* <SearchResultBar></SearchResultBar> */}
            <Switch>
                <Route path="/searchResult/all/:keyword" render={routerProps => <SearchResultAll {...routerProps}></SearchResultAll>}></Route>
                <Route path="/searchResult/songs/:keyword" render={routerProps => <SearchResultSongs {...routerProps}></SearchResultSongs>}></Route>
                <Route path="/searchResult/albums/:keyword" render={routerProps => <SearchResultAlbums {...routerProps}></SearchResultAlbums>}></Route>
                <Route path="/searchResult/artists/:keyword" render={routerProps => <SearchResultArtists {...routerProps}></SearchResultArtists>}></Route>
            </Switch>
            {/* <SearchResultSongs></SearchResultSongs>
            <SearchResultAlbums></SearchResultAlbums>
            <SearchResultArtists></SearchResultArtists> */}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultPage));