import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllArtists from 'hooks/useSearchAllArtists';
import {createArtists} from 'lib/artistClass';
import ArtistListInSearchAll from 'Components/Artist/ArtistListInSearchAll';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import { qsToNavigateInSearchResult } from 'lib/util';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: ${props => props.showHeader ? '30px':'10px'};
`
function SearchResultAllArtists(props) {
    const {history, location} = props;
    const {page_sizes=5, showHeader=true} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const result = useSearchAllArtists({keyword, exactSearch, artistName, songName, page_sizes});
    const artists = React.useMemo(() => createArtists(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const qs = qsToNavigateInSearchResult(query);
    const showAllResults = React.useCallback(() => {
        history.push(`/searchResult/artists?${qs}`, {tabName:'artists', qs})
    }, [history, qs]);
    console.log('&&: in search all artists:', result.data, artists)
    return (
        <Container showHeader={showHeader}>
            {result.isSuccess && showHeader && (
                <SearchResultAllHeader
                    category="artist"
                    searchCount={searchCount}
                    showAllResults={showAllResults}
                ></SearchResultAllHeader>
            )}
            <ArtistListInSearchAll artists={artists}></ArtistListInSearchAll>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllArtists));