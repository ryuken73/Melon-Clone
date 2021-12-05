import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import {withRouter} from 'react-router-dom';
import useAlbumList from 'hooks/useAlbumList';

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
    const replaceRequired = history.action === 'PUSH' || history.location.state === undefined;
    const fetchRequired = history.action === 'PUSH';
    console.log('re-render albumlist:', category, fetchRequired, replaceRequired)
    React.useEffect(() => {console.log('re-mount AlbumList')},[])
    const [albums, getMoreItem] = useAlbumList(category, fetchRequired, replaceRequired);
    console.log('%% result: ', albums)

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
                    <AlbumBox 
                        key={album.receipt_no}
                        receipt_no={album.receipt_no}
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
