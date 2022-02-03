import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { getString } from 'lib/util';
import TextBox from 'Components/Common/TextBox';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import ScrollBarVirtual from 'Components/Common/ScrollBarVirtual'; 
import ScrollBarRenderIfShow from 'Components/Common/ScrollBarRenderIfShow'; 
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import useAppState from 'hooks/useAppState';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import SongIteminSearchAll from 'Components/Song/SongIteminSearchAll';
import {useHotkeys} from 'react-hotkeys-hook';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
const getCurrentTimeFunc = () => {
    const now = new Date();
    return getString(now, {sep:''}).substr(0,12);
}

function SearchResultSongsScroll(props) {
    const {location } = props;
    const {page_sizes=null, page_num=null} = props;
    useHotkeys('F2',() => {
        alert('download')
    }, {enableOnTags:['INPUT']}, []);
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const needExactSearch = React.useMemo(() => exactSearch === 'yes',[exactSearch]);
    console.log('&&&&', exactSearch, needExactSearch)

    const {orderByTexts} = useAppState();
    const orderby = React.useMemo(() => orderByTexts['songList'],[orderByTexts]);
    // const params = React.useMemo(() => {
    //     const currentTime = getCurrentTimeFunc();
    //     return needExactSearch ? {
    //         scn: 'song', 
    //         query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
    //         orderby
    //     }:
    //     {
    //         scn: 'song', 
    //         query: `(song_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
    //                 or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
    //         orderby
    //     };
    // },[ needExactSearch, songName, artistName, keyword, orderby ]);
    // const uniqKeys = React.useMemo(() => {
    //     return {keyword, artistName, songName, orderby, lastKey:'song'}
    // },[keyword, artistName, songName, orderby])
    const currentTime = React.useMemo(() => {
        return getCurrentTimeFunc();
    },[keyword, artistName, songName, orderby])
    
    const params = needExactSearch ? {
            scn: 'song', 
            query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
            orderby
        }:
        {
            scn: 'song', 
            query: `(song_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
                    or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
            orderby
        };
    const uniqKeys = {keyword, artistName, songName, orderby, lastKey:'song'};

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isSuccess
    // } = useSearchSongsScroll({keyword, exactSearch, artistName, songName, page_sizes, page_num});
    } = useSearchMusicAllInfinite({params, page_sizes, page_num, uniqKeys});
    const [songs, total] = useInfiniteData(data, 'songs');
    React.useEffect(() => console.log('^^^ songs changed'),[songs]);
    React.useEffect(() => console.log('remount searchResultSongsScroll'),[]);
    return (
        <Container>
            <SongItemHeaderInSongsScroll
                songs={songs}
                total={total}
            ></SongItemHeaderInSongsScroll>
            <ScrollBarVirtual
                items={songs}
                fetchNextPage={fetchNextPage}
                rowHeight={57}
                heightMinus="220px"
                ItemElement={SongIteminSearchAll}
            >
            </ScrollBarVirtual>
            {/* <ScrollBarRenderIfShow
                songs={songs}
                fetchNextPage={fetchNextPage}
                heightMinus="220px"
            >
            </ScrollBarRenderIfShow> */}
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultSongsScroll));