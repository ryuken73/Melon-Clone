import React from 'react'
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import SearchResultAllArtists from './SearchResultAllArtists';

export default function SearchResultArtists() {
    return (
        <ScrollBarWithColor 
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 130px)' }}
        >
            <SearchResultAllArtists showHeader={false} page_sizes={20}></SearchResultAllArtists>
        </ScrollBarWithColor>
    )
}
