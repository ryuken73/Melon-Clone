import React from 'react'
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import SearchResultAllArtists from './SearchResultAllArtists';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

export default function SearchResultArtists() {
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        // <ScrollBarWithColor 
        //     autoHide 
        //     style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - 130px)`}}
        // >
        <ScrollBarSmooth
            height={`calc(${fullViewHeightMediaQuery} - 130px)`}
        >
            <SearchResultAllArtists showHeader={false} page_sizes={20}></SearchResultAllArtists>
        </ScrollBarSmooth>
        // </ScrollBarWithColor>
    )
}
