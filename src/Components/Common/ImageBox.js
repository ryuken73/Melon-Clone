import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    overflow: hidden;
    border-radius: 8px;

`
const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: ${prop => prop.borderRadius || "8px"};
    object-fit: ${prop => prop.objectFit || "cover"};
    aspect-ratio: 1;
    vertical-align: bottom;
    transform: scale(1.0);
    transition: transform 0.2s ease-out;
    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s linear;
    }
`;


const ImageBox = props => {
    const {
        src='/images/4MB029205.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        width="500",
        height="500",
    } = props;
    const onError = React.useCallback(event => {
        event.target.src='/images/no-image.png';
    },[])
    return (
        <Container>
            <Image
                alt={alt}
                title={title}
                src={src}
                onClick={onClick}
                width={width}
                height={height}
                onError={onError}
                // {...props}
            >
            
            </Image>
        </Container>
    )
}

export default React.memo(ImageBox);
