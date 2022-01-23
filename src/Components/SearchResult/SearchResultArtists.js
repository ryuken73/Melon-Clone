import React from 'react'
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import SearchResultAllArtists from './SearchResultAllArtists';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

export default function SearchResultArtists() {
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarSmooth
            height={`calc(${fullViewHeightMediaQuery} - 130px)`}
        >
            <SearchResultAllArtists showHeader={false} page_sizes={20}></SearchResultAllArtists>
        </ScrollBarSmooth>
    )
}
