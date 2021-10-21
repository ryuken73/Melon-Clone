import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

// const Container = styled(Box)`
//     display: flex;
//     /* flex-wrap: wrap; */
//     height: ${prop => prop.height || "auto"};
//     width: ${prop => prop.height || "auto"};
//     margin-top: 10px;
// `

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* flex-wrap: wrap; */
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`

const AlbumList = props => {
    const {albums=[]} = props;
    return (
        <ScrollBarWithColor autoHide style={{ width:'100%', height: '100vh' }}>
            <Container>
                {albums.map(album => (  
                // <Box height="50px" flex="1" bgcolor="red">{album.nameArtist}</Box>
                    <AlbumBox 
                        key={album.id}
                        nameAlbum={album.nameAlbum} 
                        nameArtist={album.nameArtist}
                    ></AlbumBox>
                ))}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(AlbumList)
