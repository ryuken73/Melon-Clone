import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';

const Container = styled(Box)`
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    position: relative;
    cursor: pointer;
`
const ProgramBoxImage = props => {
  const {
        src='/images/no_image_black.jpg',
        onClick=()=>{},
        alt="image",
        title="related image",
        resizeOnHover=true,
    } = props;
    const [isHover, setHover] = React.useState(false);

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
                loadingImage="/images/no_image_black_16_9.jpg"
                onClick={onClick}
                isHoverInnerElement={isHover}
                isResizeOnHover={resizeOnHover}
                {...props}
            >            
            </ImageBox>
        </Container>
    )
}

export default React.memo(ProgramBoxImage);
