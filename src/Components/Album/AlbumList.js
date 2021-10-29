import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
import useFetchAlbums from '../../hooks/useFetchAlbums';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`
const FETCH_COUNT=12;

const AlbumList = props => {
    const {history} = props;
    const {match} = props;
    const {pathname} = match.params;
    const [pageNum, setPageNum] = React.useState(1);

    React.useEffect(()=>{
        setPageNum(1)
    },[pathname])

    const getMoreItem = React.useCallback(() => {
        setPageNum(pageNum => pageNum+1)
    },[]) 

    const {albums, error, loading} = useFetchAlbums(pathname, pageNum, FETCH_COUNT);

    return (
        <ScrollBarWithColor getMoreItem={getMoreItem} autoHide style={{ width:'100%', height: 'calc(100vh - 100px)' }}>
            <Container>
                {albums.map((album,index) => (  
                    <AlbumBox 
                        key={album.receipt_no}
                        nameAlbum={album.album_name} 
                        nameArtist={album.artist}
                        imagePath={album.eval_imagePath}
                        history={history}
                    ></AlbumBox>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(withRouter(AlbumList))
