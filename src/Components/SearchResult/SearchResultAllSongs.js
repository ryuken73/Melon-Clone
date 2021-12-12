import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllSongs from 'hooks/useSearchAllSongs';
import createSong from 'lib/songClass';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import { qsToNavigateInSearchResult } from 'lib/util';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function SearchResultAllSongs(props) {
    const {history, match, location } = props;
    const {category} = match.params;
    const {page_sizes=null, page_num=null} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const result = useSearchAllSongs({keyword, exactSearch, artistName, songName, page_sizes, page_num});
    const songs = React.useMemo(() => createSong(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const qs = qsToNavigateInSearchResult(query);
    const showAllResults = React.useCallback(() => {
        history.push(`/searchResult/songs?${qs}`, {tabName:'songs', qs})
    }, [history, qs]);
    console.log('&&: in search all song:', result.data, songs)
    return (
        <Container>
            {result.isSuccess && (
                <SearchResultAllHeader
                    category="song"
                    searchCount={searchCount}
                    showAllResults={showAllResults}
                ></SearchResultAllHeader>
            )}
           <SongListInSearchAll songs={songs}></SongListInSearchAll>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllSongs));