import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`
const Image = styled.img`
    height: ${prop => prop.height || "150px"};
    width: ${prop => prop.width || "150px"};
    border-radius: ${prop => prop.borderRadius || "8px"};
    object-fit: ${prop => prop.objectFit || "cover"};
    aspect-ratio: 1

`;


const ImageBox = props => {
    const {
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image"

    } = props;
    return (
        <Container>
            <Image
                alt={alt}
                title={title}
                src={src}
                onClick={onClick}
                {...props}
            >
            
            </Image>
        </Container>
    )
}

export default ImageBox;
