import React from 'react';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import SearchResultAllSongs from './SearchResultAllSongs';
import SearchResultAllAlbums from './SearchResultAllAlbums';
import SearchResultAllArtists from './SearchResultAllArtists';
import SearchResultAllLyrics from './SearchResultAllLyrics';
import SearchResultAllArchives from './SearchResultAllArchives';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

function SearchResultAll(props) {
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor 
            autoHide 
            style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 130px)`}}
        >
            <SearchResultAllSongs></SearchResultAllSongs>
            <SearchResultAllAlbums></SearchResultAllAlbums>
            <SearchResultAllArtists page_sizes={5}></SearchResultAllArtists>
            <SearchResultAllLyrics></SearchResultAllLyrics>
            <SearchResultAllArchives></SearchResultAllArchives>
        </ScrollBarWithColor>
    )
}

export default React.memo(SearchResultAll);