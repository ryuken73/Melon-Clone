import React from 'react';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import SearchResultAllSongs from './SearchResultAllSongs';
import SearchResultAllAlbums from './SearchResultAllAlbums';
import {Switch, Route, withRouter} from 'react-router-dom';

function SearchResultAll(props) {
    const {history, match } = props;
    const {keyword} = match.params;
    return (
        <ScrollBarWithColor 
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 100px)' }}
        >
            <SearchResultAllSongs></SearchResultAllSongs>
            <SearchResultAllAlbums></SearchResultAllAlbums>
        </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(SearchResultAll));