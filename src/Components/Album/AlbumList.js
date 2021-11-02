import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
import useAlbumList from '../../hooks/useAlbumList';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`
const FETCH_COUNT=12;

const AlbumList = props => {
    const {history} = props;
    const {match} = props;
    const {pathname} = match.params;
    const newFetchRequired = history.action === 'PUSH' || history.location.state === undefined;
    console.log('re-render albumlist:', newFetchRequired)
    const [albums, getMoreItem] = useAlbumList(pathname, newFetchRequired);
    console.log('%% result: ', albums)

    return (
        <ScrollBarWithColor 
            moveScrollToTop={newFetchRequired} 
            getMoreItem={getMoreItem} 
            pathname={pathname}
            autoHide 
            style={{ width:'100%', height: 'calc(100vh - 100px)' }}
        >
            <Container>
                {albums.map((album,index) => (  
                    <AlbumBox 
                        key={album.receipt_no}
                        receiptNo={album.receipt_no}
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
