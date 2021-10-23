import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-right: 10px;
`

const AlbumList = props => {
    const {albums=[], history, getMoreItem=()=>{}} = props;
    return (
        <ScrollBarWithColor getMoreItem={getMoreItem} autoHide style={{ width:'100%', height: 'calc(100vh - 100px)' }}>
            <Container>
                {albums.map((album,index) => (  
                    <AlbumBox 
                        key={index}
                        nameAlbum={album.nameAlbum} 
                        nameArtist={album.nameArtist}
                        history={history}
                    ></AlbumBox>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(AlbumList)
