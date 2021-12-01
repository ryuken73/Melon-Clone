import React from 'react';
import SearchResultSongsScroll from './SearchResultSongsScroll';

function SearchResultSongs() {
    return (
        <SearchResultSongsScroll
            page_sizes={20}
            page_num={1}
        >
        </SearchResultSongsScroll>
    )
}

export default React.memo(SearchResultSongs);
