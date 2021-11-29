import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllArtists from 'hooks/useSearchAllArtists';
import createArtist from 'lib/artistClass';
import ArtistListInSearchAll from 'Components/Artist/ArtistListInSearchAll';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: 30px;
`
function SearchResultAllArtists(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const result = useSearchAllArtists({keyword, exactSearch, artistName, songName});
    const artists = React.useMemo(() => createArtist(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const showAllResults = React.useCallback(() => {}, []);
    console.log('&&: in search all song:', result.data, artists)
    return (
        <Container>
            {result.isSuccess && (
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