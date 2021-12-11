import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
import useAlbumList from 'hooks/useAlbumList';
import useQueryAlbumScroll from 'hooks/useQueryAlbumScroll';
import createAlbum from 'lib/albumClass';
import RenderIfVisible from 'react-render-if-visible';

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
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isSuccess
    } = useQueryAlbumScroll({category, page_sizes:31, page_num:1});
    console.log('%% result: ', data)
    const pages = React.useMemo(() => data ? data.pages:[], [data]);
    const albums = React.useMemo(() => {
        const merged = pages.reduce((apiResult, acc) => {
            const albums = apiResult.fdata;
            return {...apiResult, fdata:[...albums, ...acc.fdata]}
        },{fdata:[]})
        return createAlbum(merged)
    },[pages]);

    const getMoreItem = React.useCallback(() => {
        fetchNextPage();
    },[fetchNextPage]);

    console.log('@@@@@@@@@@@@@@',replaceRequired)
    return (
        <ScrollBarWithColor 
            moveScrollToTop={replaceRequired} 
            getMoreItem={getMoreItem} 
            category={category}
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 100px)' }}
        >
            <Container>
                {albums.map((album,index) => (  
                    // <RenderIfVisible defaultHeight={270}>
                    <AlbumBox 
                        key={album.receipt_no}
                        receipt_no={album.receipt_no}
                        nameAlbum={album.album_name} 
                        nameArtist={album.artist}
                        imagePath={album.eval_imagePath}
                        history={history}
                        lazyLoaing={true}
                    ></AlbumBox>
                    // </RenderIfVisible>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(AlbumList))
