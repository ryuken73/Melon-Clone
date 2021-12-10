import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CONSTANTS from 'config/constants';

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
    ${({isResizeOnHover, isHoverInnerElement}) => isResizeOnHover && `
        &:hover {
            transform: scale(1.05);
            transition: transform 0.3s linear;
        }
        ${({isHoverInnerElement}) => isHoverInnerElement && `
                transform: scale(1.05);
                transition: transform 0.3s linear;
            `
        }
    `}

`;

const THRESHOLD = CONSTANTS.IMAGE_LAZY_SHOW_THRESHOLD

const ImageBox = props => {
    const {
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        width="500",
        height="500",
        isResizeOnHover=false,
        isHoverInnerElement=false,
        lazyLoading=true
    } = props;
    const imgRef = React.useRef(null);
    const observerRef = React.useRef();
    const [isLoaded, setIsLoaded] = React.useState(false);

    const imageSrc = React.useMemo(() => {
        if(lazyLoading && isLoaded){
            return src;
        }
        if(lazyLoading && !isLoaded){
            return '/images/no-image.png'
        }
        if(!lazyLoading){
            return src
        }

    },[lazyLoading, isLoaded, src])

    const onIntersection = (entries, io)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                io.unobserve(entry.target);
                setIsLoaded(true);
            }
        })
    }

    React.useEffect(()=>{
        if(!observerRef.current){
            observerRef.current = new IntersectionObserver(onIntersection, {
                threshold: 0
            })
        }
        imgRef.current && observerRef.current.observe(imgRef.current);
    },[])


    const onError = React.useCallback(event => {
        event.target.src='/images/no-image.png';
    },[])
    return (
        <Container>
            <Image
                ref={imgRef}
                alt={alt}
                title={title}
                src={imageSrc}
                onClick={onClick}
                width={width}
                height={height}
                onError={onError}
                isResizeOnHover={isResizeOnHover}
                isHoverInnerElement={isHoverInnerElement}
                // loading="lazy"
                // loaded={loaded}
                // onLoad={showImage}
                // {...props}
            >
            
            </Image>
        </Container>
    )
}

export default React.memo(ImageBox);
