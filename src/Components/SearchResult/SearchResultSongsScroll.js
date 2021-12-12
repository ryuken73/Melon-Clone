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
import useInfiniteData from 'hooks/useInfiniteData';

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
    const [songs, total] = useInfiniteData(data, 'songs');
    console.log('&&: in search all song:', data, songs)
    const category="";
    const replaceRequired = false;
    const rootForObservation = React.useRef();
    return (
        <Container>
            <SongItemHeaderInSongsScroll
                songs={songs}
                total={total}
            ></SongItemHeaderInSongsScroll>
            <ScrollBarWithColor
                moveScrollToTop={replaceRequired} 
                getMoreItem={fetchNextPage} 
                category={category}
                autoHide 
                style={{ width:'100%', height: 'calc(100vh - 220px)' }}
                ref={rootForObservation}
            >
                <SongListInSearchAll rootRef={rootForObservation} songs={songs}></SongListInSearchAll>
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