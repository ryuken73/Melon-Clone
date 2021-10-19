import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled(Box)`
    display: flex;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-top: 10px;
`
const slickOpts = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

const AlbumList = props => {
    const {albums={}} = props;
    return (
        <Container width="100%">
            {/* <div style={{maxWidth: '1200px', minWidth: '0px'}}> */}
            <Slider
                {...slickOpts}
            >
                {albums.map(album => (
                    // <Box height="50px" flex="1" bgcolor="red">{album.nameArtist}</Box>
                    <AlbumBox 
                        key={album.id}
                        nameAlbum={album.nameAlbum} 
                        nameArtist={album.nameArtist}
                     ></AlbumBox>
                ))}
                
            </Slider>
            {/* </div> */}

        </Container>
    )
}

export default AlbumList