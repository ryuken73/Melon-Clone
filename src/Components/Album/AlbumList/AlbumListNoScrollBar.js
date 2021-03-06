import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from '../AlbumBox';
import {withRouter} from 'react-router-dom';
// import useAlbumList from 'hooks/useAlbumList';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`
const AlbumList = props => {
    const {albums} = props;
    const {history} = props;
    console.log('re-render albumlist:', albums);
    return (
        <Container>
            {albums.map((album,index) => (  
                <AlbumBox 
                    album={album}
                    key={album.receipt_no}
                    // receipt_no={album.receipt_no}
                    // nameAlbum={album.album_name_bold} 
                    // nameArtist={album.artist_bold}
                    // matched={album.artist_matched}
                    // imagePath={album.eval_imagePath}
                    // releaseYear={album.release_year}
                    history={history}
                    preserveHtmlTag={true}
                ></AlbumBox>
            ))}
        </Container>
    )
}

export default React.memo(withRouter(AlbumList))
