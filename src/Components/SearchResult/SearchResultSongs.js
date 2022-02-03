import React from 'react';
import SearchResultSongsScroll from './SearchResultSongsScroll';
import CONSTANTS from 'config/constants';
const {SEARCH_SONG_PAGE_SIZES} = CONSTANTS;

function SearchResultSongs() {
    React.useEffect(() => console.log('remount SearchResultSong'),[]);
    return (
        <SearchResultSongsScroll
            page_sizes={SEARCH_SONG_PAGE_SIZES}
            page_num={1}
        >
        </SearchResultSongsScroll>
    )
}

export default React.memo(SearchResultSongs);
