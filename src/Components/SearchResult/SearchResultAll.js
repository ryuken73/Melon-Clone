import React from 'react';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import SearchResultAllSongs from './SearchResultAllSongs';
import SearchResultAllAlbums from './SearchResultAllAlbums';
import SearchResultAllArtists from './SearchResultAllArtists';
import SearchResultAllLyrics from './SearchResultAllLyrics';

function SearchResultAll(props) {
    return (
        <ScrollBarWithColor 
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 130px)' }}
        >
            <SearchResultAllSongs></SearchResultAllSongs>
            <SearchResultAllAlbums></SearchResultAllAlbums>
            <SearchResultAllArtists page_sizes={5}></SearchResultAllArtists>
            <SearchResultAllLyrics></SearchResultAllLyrics>
        </ScrollBarWithColor>
    )
}

export default React.memo(SearchResultAll);