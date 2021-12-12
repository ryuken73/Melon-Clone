import React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import styled from 'styled-components';
// import useSearchSongsScroll from 'hooks/useSearchSongsScroll';
// import createSong from 'lib/songClass';
import { getString } from 'lib/util';
import TextBox from 'Components/Common/TextBox';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import AlbumList from 'Components/Album/AlbumList/AlbumList';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function SearchResultAlbumsScroll(props) {
    const {history, match, location } = props;
    const {page_sizes=null, page_num=null} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const now = new Date();
    const currentTime = getString(now, {sep:''}).substr(0,12);
    const needExactSearch = React.useMemo(() => exactSearch === 'yes',[exactSearch])
    const params = needExactSearch ? {
        scn: 'song', 
        query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,song_name_str asc'
    }:
    {
        scn: 'song', 
        query: `(song_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
                or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
        orderby: 'order by release_year desc,song_name_str asc'
    };
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
    } = useSearchMusicAllInfinite({params, page_sizes, page_num});
    console.log('@@@@:', data);
    const [songs, total] = useInfiniteData(data, 'songs');
    console.log('&&: in search all song:', data, songs)
    const category="";
    const replaceRequired = false;
    const rootForObservation = React.useRef();
    const albums = [];
    return (
        <Container>
            <ScrollBarWithColor
                moveScrollToTop={replaceRequired} 
                getMoreItem={fetchNextPage} 
                category={category}
                autoHide 
                style={{ width:'100%', height: 'calc(100vh - 220px)' }}
                ref={rootForObservation}
            >
                <AlbumList albums={albums}></AlbumList>
            </ScrollBarWithColor>
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAlbumsScroll));