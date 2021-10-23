import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`
const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: ${prop => prop.borderRadius || "8px"};
    object-fit: ${prop => prop.objectFit || "cover"};
    aspect-ratio: 1;
`;


const ImageBox = props => {
    const {
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        width="500",
        height="500"
    } = props;
    return (
        <Container>
            <Image
                alt={alt}
                title={title}
                src={src}
                onClick={onClick}
                width={width}
                height={height}
                // {...props}
            >
            
            </Image>
        </Container>
    )
}

export default React.memo(ImageBox);
