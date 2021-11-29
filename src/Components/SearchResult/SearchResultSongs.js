import React from 'react';
import SearchResultAllSongs from './SearchResultAllSongs';

function SearchResultSongs() {
    return (
        <SearchResultAllSongs
            page_sizes={20}
            page_num={1}
        >
        </SearchResultAllSongs>
    )
}

export default React.memo(SearchResultSongs);
