import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import useSearchSongsScroll from 'hooks/useSearchSongsScroll';
import createSong from 'lib/songClass';
import TextBox from 'Components/Common/TextBox';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function SearchResultSongsScroll(props) {
    const {history, match, location } = props;
    const {page_sizes=null, page_num=null} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    // const result = useSearchSongsScroll({keyword, exactSearch, artistName, songName, page_sizes, page_num});
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isSuccess
    } = useSearchSongsScroll({keyword, exactSearch, artistName, songName, page_sizes, page_num});
    console.log('@@@@:', data);
    const pages = React.useMemo(() => data ? data.pages:[], [data]);
    const songs = React.useMemo(() => {
        const merged = pages.reduce((apiResult, acc) => {
            const songs = apiResult.fdata;
            return {...apiResult, fdata:[...acc.fdata, ...songs]}
        },{fdata:[]})
        return createSong(merged)
    },[pages]);
    const searchCount = isSuccess ? data.pages[0].total : '...';
    const showAllResults = React.useCallback(() => {}, []);
    console.log('&&: in search all song:', data, songs)
    const category="";
    const getMoreItem = React.useCallback(() => {
        fetchNextPage();
    },[fetchNextPage]);
    const replaceRequired = false;
    return (
        <Container>
            <SongItemHeaderInSongsScroll></SongItemHeaderInSongsScroll>
            <ScrollBarWithColor
                moveScrollToTop={replaceRequired} 
                getMoreItem={getMoreItem} 
                category={category}
                autoHide 
                style={{ width:'100%', height: 'calc(100vh - 220px)' }}
            >
                <SongListInSearchAll songs={songs}></SongListInSearchAll>
            </ScrollBarWithColor>
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultSongsScroll));