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
    aspect-ratio: ${prop => prop.aspectRatio || 1};
    /* aspect-ratio: ${prop => prop.aspectRatio || `attr(width) / attr(height)`}; */
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

const getExtension = src => {
    const srcSplit = src.split('.');
    if(srcSplit.length === 1) {
        return false;
    } 
    return srcSplit[srcSplit.length -1];

}

const THRESHOLD = CONSTANTS.IMAGE_LAZY_SHOW_THRESHOLD

const ImageBox = props => {
    const {
        src='/images/loading-album.png',
        loadingImage="/images/loading-album.png",
        onClick=()=>{},
        alt="image",
        title="related image",
        width="500",
        height="500",
        isResizeOnHover=false,
        isHoverInnerElement=false,
        lazyLoading=true,
        objectFit="cover",
        withoutSrcExtension=false,
        ...restProps
    } = props;
    const imgRef = React.useRef(null);
    const observerRef = React.useRef();
    const [isLoaded, setIsLoaded] = React.useState(false);

    const imageSrc = React.useMemo(() => {
        if(lazyLoading && isLoaded){
            return src;
        }
        if(lazyLoading && !isLoaded){
            return loadingImage;
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
        if(lazyLoading === false) return;
        if(!observerRef.current){
            observerRef.current = new IntersectionObserver(onIntersection, {
                threshold: 0
            })
        }
        imgRef.current && observerRef.current.observe(imgRef.current);
    },[lazyLoading])


    const onError = React.useCallback(event => {
        if(!withoutSrcExtension){
            event.target.src = loadingImage
            return;
        }
        const extension = getExtension(event.target.src);
        if(extension === 'JPG'){
            event.target.src = `${event.target.src.replace('JPG', 'jpg')}`
            return
        } else if(extension === 'jpg'){
            event.target.src = `${event.target.src.replace('jpg', 'png')}`
            return
        } else if(extension === 'png'){
            event.target.src = `${event.target.src.replace('png', 'PNG')}`
            return
        } else if(extension === 'PNG'){
            event.target.src = `${event.target.src.replace('PNG', 'gif')}`
            return
        } else if(extension === 'gif'){
            event.target.src = `${event.target.src.replace('gif', 'GIF')}`
            return
        } else {
            event.target.src = loadingImage;
        }
        return
    },[withoutSrcExtension, loadingImage])

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
                objectFit={objectFit}
                {...restProps}
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
