import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllLyrics from 'hooks/useSearchAllLyrics';
import createLyrics from 'lib/lyricsClass';
import LyricsListInSearchAll from 'Components/Lyrics/LyricsListInSearchAll';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import { qsToNavigateInSearchResult } from 'lib/util';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: 30px;
`
function SearchResultLyrics(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    console.log('^^^^:', query)
    const result = useSearchAllLyrics({keyword, exactSearch, artistName, songName, page_sizes:50});
    const lyrices = React.useMemo(() => createLyrics(result.data),[result.data]);
    return (
        <Container>
            <ScrollBarWithColor
                autoHide 
                style={{width:'100%', height:'calc(100vh - 150px)'}}
            >
                <LyricsListInSearchAll lyrices={lyrices}></LyricsListInSearchAll>
            </ScrollBarWithColor>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultLyrics));