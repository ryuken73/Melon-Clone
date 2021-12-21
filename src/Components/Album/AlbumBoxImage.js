import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HoverButton from 'Components/Common/ButtonHover';
import ImageBox from 'Components/Common/ImageBox';
import colors from 'config/colors';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useQueryAlbumInfo from 'hooks/useQueryAlbumInfo';
import createAlbumInfo from 'lib/albumInfoClass';

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
const AlbumBoxImage = props => {
  const {
        receipt_no=0,
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        resizeOnHover=true,
    } = props;
    const [isHover, setHover] = React.useState(false);

    const query = useQueryAlbumInfo(receipt_no, false);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const onClickPlay = React.useCallback(()=>{
        query.refetch()
        .then(result => {
            const albumInfo = createAlbumInfo(result.data);
            const songsInAlbum = albumInfo.list_song;
            addSongsToCurrentPlaylist(songsInAlbum, true); 
        })
    },[addSongsToCurrentPlaylist, query]);

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

export default React.memo(AlbumBoxImage);
