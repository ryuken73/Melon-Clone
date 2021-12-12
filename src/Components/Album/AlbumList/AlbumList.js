import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
// import useAlbumList from 'hooks/useAlbumList';
import useQueryAlbumByCategoryScroll from 'hooks/useQueryAlbumByCategoryScroll';
// import createAlbum from 'lib/albumClass';
import RenderIfVisible from 'react-render-if-visible';
import useInfiniteData from 'hooks/useInfiniteData';

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
    const replaceRequired = false;
    React.useEffect(() => {console.log('re-mount AlbumList')},[])
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isSuccess
    } = useQueryAlbumByCategoryScroll({category, page_sizes:31, page_num:1});
    console.log('%% result: ', data)
    const [albums, total] = useInfiniteData(data, 'albums');

    return (
        <ScrollBarWithColor 
            moveScrollToTop={replaceRequired} 
            getMoreItem={fetchNextPage} 
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
