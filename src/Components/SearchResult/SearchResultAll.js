import React from 'react';
import SearchResultAllSongs from './SearchResultAllSongs';
import {Switch, Route, withRouter} from 'react-router-dom';

function SearchResultAll(props) {
    const {history, match } = props;
    const {keyword} = match.params;
    return (
        <SearchResultAllSongs></SearchResultAllSongs>
    )
}

export default React.memo(withRouter(SearchResultAll));