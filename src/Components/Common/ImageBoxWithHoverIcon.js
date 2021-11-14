import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HoverButton from './ButtonHover';
import ImageBox from './ImageBox';
import colors from '../../config/colors';
import {addSongsInAlbumToCurrentPlaylist} from 'Components/Album/albumSlice';
import { useDispatch } from 'react-redux';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    position: relative;
    /* &:before {
        content: '';
        display: block;
        position: absolute;
        height: 0%;
        width: 100%;
        bottom: 0;
        pointer-events: none;
        background: linear-gradient(to bottom, transparent, ${colors.highCenterPane});
    }
    &:hover:before {
        height: 100%;
    } */
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
  const dispatch = useDispatch();
  const {
        receipt_no=0,
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        resizeOnHover=true,
    } = props;
    const [isHover, setHover] = React.useState(false);
    const onClickPlay = React.useCallback(()=>{
        console.log('click play:', receipt_no)
        dispatch(addSongsInAlbumToCurrentPlaylist({receipt_no}));
    },[receipt_no], dispatch);
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
                isHoverInnerElement={isHover}
                isResizeOnHover={resizeOnHover}
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
