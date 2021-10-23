import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HoverButton from './ButtonHover';
import ImageBox from './ImageBox';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    position: relative;
`
const BoxShownOnHover = styled(Box)`
    && {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        background-color: 'transparent';
        color: white;
        padding: 0px;
        border: none;
        border-radius: 5px;
    }

`
const ImageBoxWithHoverIcon = props => {
    const {
        src='/images/4MB029205.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
    } = props;
    const [isHover, setHover] = React.useState(false);
    const onClickPlay = ()=>{};
    const InnerElement = () => (
        <HoverButton onClick={onClickPlay} opacitynormal='0.7' opacityhover='1'>
            <PlayArrowIcon fontSize="large" ></PlayArrowIcon>
        </HoverButton> 
    )
    const onMouseEnter = React.useCallback(() => {
        setHover(true);
    },[])
    const onMouseLeave = React.useCallback(() => {
        setHover(false);
    },[])
    return (
        <Container 
            onMouseOver={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ImageBox
                alt={alt}
                title={title}
                src={src}
                onClick={onClick}
                {...props}
            >            
            </ImageBox>
            {isHover && (
                <BoxShownOnHover>
                    <InnerElement></InnerElement>
                </BoxShownOnHover>
            )}
        </Container>
    )
}

export default React.memo(ImageBoxWithHoverIcon);
