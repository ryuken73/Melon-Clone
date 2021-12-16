import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { getString } from 'lib/util';
import TextBox from 'Components/Common/TextBox';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongItemHeaderInSongsScroll from 'Components/Song/SongItemHeaderInSongsScroll';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import useInfiniteData from 'hooks/useInfiniteData';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import { useVirtual } from "react-virtual";
import SongIteminSearchAll from 'Components/Song/SongIteminSearchAll';
import Divider from '@mui/material/Divider';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function SearchResultSongsScroll(props) {
    const {location } = props;
    const {page_sizes=null, page_num=null} = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const [scrollRefTime, setScrollRefTime] = React.useState(Date.now());
    const getCurrentTimeFunc = React.useCallback(() => {
        const now = new Date();
        return getString(now, {sep:''}).substr(0,12);
    },[])
    const needExactSearch = React.useMemo(() => exactSearch === 'yes',[exactSearch])
    const params = React.useCallback(() => {
        const currentTime = getCurrentTimeFunc();
        return needExactSearch ? {
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
    },[getCurrentTimeFunc, needExactSearch, songName, artistName, keyword ]);
    const uniqKeys = React.useMemo(() => {
        return {keyword, artistName, songName, lastKey:'song'}
    },[keyword, artistName, songName])
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
    // console.log('@@@@:', data);
    // console.log('^^^^ re-render songScroll');
    const [songs, total] = useInfiniteData(data, 'songs');
    // console.log('&&: in search all song:', data, songs)
    const category="";
    const replaceRequired = false;
    const parentRef = React.useRef();
    const rowVirtualizer = useVirtual({
        size: songs.length,
        overscan: 1,
        parentRef,
        estimateSize: React.useCallback(() => 57, [])
    });
    // console.log('^^^^', parentRef.current, rowVirtualizer.totalSize)
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
                ref={parentRef}
                setScrollRefTime={setScrollRefTime}
            >
            {/* <div ref={parentRef} style={{height: "100vh", overflow:"auto"}}> */}
                <div
                    style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: "100%",
                    position: "relative"
                    }}
                >
                    {rowVirtualizer.virtualItems.map(virtualRow => {
                        const song = songs[virtualRow.index];
                        console.log(`${song.id}::${virtualRow.index}`)
                        return (
                            <div
                                key={virtualRow.index}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`
                                }}
                            >
                                <Box key={song.id} px="10px">
                                    <SongIteminSearchAll
                                        rownum={virtualRow.index}
                                        fontSize="14px"
                                        color="white"
                                        song={song}
                                        width="100%"
                                    ></SongIteminSearchAll>
                                    <Divider opacity="0.2" margin="0px" mr={"15px"}></Divider>
                                </Box>
                            </div>
                        );                        
                    })}
                    {/* <SongListInSearchAll renderIfVisible={false} rootRef={rootForObservation} songs={songs}></SongListInSearchAll> */}
                </div>
            {/* </div> */}
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