import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllAlbums from 'hooks/useSearchAllAlbums';
import createAlbum from 'lib/albumClass';
import AlbumListNoScrollBar from 'Components/Album/AlbumList/AlbumListNoScrollBar';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import { qsToNavigateInSearchResult } from 'lib/util';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: 30px;
`
function SearchResultAllAlbums(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const result = useSearchAllAlbums({keyword, exactSearch, artistName, songName});
    const albums = React.useMemo(() => createAlbum(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const qs = qsToNavigateInSearchResult(query);
    const showAllResults = React.useCallback(() => {
        history.push(`/searchResult/albums?${qs}`, {tabName:'albums', qs})
    }, [history, qs]);
    console.log('&&: in search all albums:', result.data, albums)
    return (
        <Container>
            {result.isSuccess && (
                <SearchResultAllHeader
                    category="album"
                    searchCount={searchCount}
                    showAllResults={showAllResults}
                ></SearchResultAllHeader>
            )}
            <AlbumListNoScrollBar albums={albums}></AlbumListNoScrollBar>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllAlbums));