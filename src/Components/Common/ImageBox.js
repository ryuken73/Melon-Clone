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
    ${({isHoverInnerElement}) => isHoverInnerElement && `
        transform: scale(1.05);
        transition: transform 0.3s linear;
    `
    }
`;

const LoadingImage = styled(Image)`
    display: ${props => props.loaded && "none !important"}
`
const LoadedImage = styled(Image)`
    display: ${props => !props.loaded && "none !important"}
`

const ImageBox = props => {
    const {
        src='/images/4MB029205.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        width="500",
        height="500",
        isHoverInnerElement=false
    } = props;
    const [loaded, setLoaded] = React.useState(false);
    const showImage = React.useCallback(() => {
        setLoaded(true);
    },[setLoaded])
    const onError = React.useCallback(event => {
        event.target.src='/images/no-image.png';
    },[])
    return (
        <Container>
            <LoadingImage
                alt={alt}
                title={title}
                src='/images/loading-album.png'
                onClick={onClick}
                width={width}
                height={height}
                onError={onError}
                isHoverInnerElement={isHoverInnerElement}
                loading="lazy"
                loaded={loaded}
                // {...props}
            >
            
            </LoadingImage>
            <LoadedImage
                alt={alt}
                title={title}
                src={src}
                onClick={onClick}
                width={width}
                height={height}
                onError={onError}
                isHoverInnerElement={isHoverInnerElement}
                // loading="lazy"
                loaded={loaded}
                onLoad={showImage}
                // {...props}
            >
            
            </LoadedImage>
        </Container>
    )
}

export default React.memo(ImageBox);
