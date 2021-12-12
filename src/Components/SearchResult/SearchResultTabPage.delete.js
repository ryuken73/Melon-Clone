import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import SearchResultAll from './SearchResultAll';
import SearchResultSongs from './SearchResultSongs';
import SearchResultAlbums from './SearchResultAlbums';
import SearchResultArtists from './SearchResultArtists';

function SearchResultTabPage(props) {
    const {location} = props;
    const {pathname, keyword} = location;
    return (
        <Switch>
            <Route path="/searchResult/all/:keyword" render={routerProps => <SearchResultSongs  {...routerProps}></SearchResultSongs>}></Route>
            <Route path="/searchResult/songs/:keyword" render={routerProps => <SearchResultSongs {...routerProps}></SearchResultSongs>}></Route>
            <Route path="/searchResult/albums/:keyword" render={routerProps => <SearchResultAlbums {...routerProps}></SearchResultAlbums>}></Route>
            <Route path="/searchResult/artists/:keyword" render={routerProps => <SearchResultArtists {...routerProps}></SearchResultArtists>}></Route>
            
        </Switch>
    )
}

export default React.memo(withRouter(SearchResultTabPage))