// https://codesandbox.io/s/github/tannerlinsley/react-virtual/tree/master/examples/infinite-scroll?file=/src/index.js:190-204

import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
import useAlbumList from 'hooks/useAlbumList';
import useQueryAlbumScroll from 'hooks/useQueryAlbumScroll';
import createAlbum from 'lib/albumClass';
import {useVirtual} from 'react-virtual';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`
const FETCH_COUNT=12;

const AlbumList = props => {
    const {history} = props;
    const {match} = props;
    const {category} = match.params;
    // const replaceRequired = history.action === 'PUSH' || history.location.state === undefined;
    const replaceRequired = false;
    const fetchRequired = history.action === 'PUSH';
    console.log('re-render albumlist:', category, fetchRequired, replaceRequired)
    React.useEffect(() => {console.log('re-mount AlbumList')},[])
    // const [albums, getMoreItem] = useAlbumList(category, fetchRequired, replaceRequired);
    const {
        data,
        error,
        fetchNextPage,
        fetchMore,
        canFetchMore,
        hasNextPage,
        isFetching,
        isFetchingMore,
        isFetchingNextPage,
        status,
        isSuccess
    } = useQueryAlbumScroll({category, page_sizes:100, page_num:1});
    console.log('%% result: ', data)
    const pages = React.useMemo(() => data ? data.pages:[], [data]);
    const albums = React.useMemo(() => {
        const merged = pages.reduce((apiResult, acc) => {
            const albums = apiResult.fdata;
            return {...apiResult, fdata:[...albums, ...acc.fdata]}
        },{fdata:[]})
        return createAlbum(merged)
    },[pages]);

    const parentRef = React.useRef();
    console.log('############:parentRef:', parentRef.current)
    const rowVirtualizer = useVirtual({
        size: albums.length,
        parentRef,
        estimateSize: React.useCallback(() => 45, [])
    })

    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.virtualItems].reverse();
        console.log('^^^^^^^^^^^^^^^^^', rowVirtualizer.virtualItems, lastItem?.index, albums.length);
        if(!lastItem){
            return
        }
        if(lastItem.index >= albums.length -1 && !isFetchingMore){
            fetchNextPage()
        }
    },[rowVirtualizer.virtualItems,albums.length, isFetchingMore, fetchNextPage])

    const getMoreItem = React.useCallback(() => {
        // fetchNextPage();
        return;
    },[fetchNextPage]);

    console.log('@@@@@@@@@@@@@@',replaceRequired)
    return (
        // <ScrollBarWithColor 
        //     moveScrollToTop={replaceRequired} 
        //     getMoreItem={getMoreItem} 
        //     category={category}
        //     autoHide 
        //     // style={{ width:'100%', height: 'calc(100vh - 100px)' }}
        //     style={{ width:'100%', height: '800px' }}
        //     ref={parentRef}
        // >
        <div style={{overflow:"auto", height:"800px"}} ref={parentRef}>
            <div style={{ height: `${rowVirtualizer.totalSize}px`, position: "relative" }}>
            <Container>
                {rowVirtualizer.virtualItems.map(virtualRow => {
                    const album = albums[virtualRow.index];
                    return (
                        <AlbumBox 
                            key={album.receipt_no}
                            receipt_no={album.receipt_no}
                            nameAlbum={album.album_name} 
                            nameArtist={album.artist}
                            imagePath={album.eval_imagePath}
                            history={history}
                            lazyLoading={false}
                        ></AlbumBox>
                    )
                })}
                {/* {albums.map((album,index) => (  
                    <AlbumBox 
                        key={album.receipt_no}
                        receipt_no={album.receipt_no}
                        nameAlbum={album.album_name} 
                        nameArtist={album.artist}
                        imagePath={album.eval_imagePath}
                        history={history}
                        lazyLoading={false}
                    ></AlbumBox>
                ))} */}
            </Container>
            </div>
        </div>
        // </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(AlbumList))
