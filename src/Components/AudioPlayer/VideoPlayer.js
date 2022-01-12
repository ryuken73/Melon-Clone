import React from 'react';
import styled from 'styled-components';

const CustomVideo = styled.video`
    width: 90%;
    /* aspect-ratio: 4/3; */
    object-fit: cover;
    pointer-events: none;
    margin: auto;
`

const VideoPlayer = (props, ref) => {
    React.useEffect(() => {
        console.log('src changed. mounted:', ref)
        return () => {
            console.log('src changed. player umounted:', ref)
        }
    },[ref])
    return (
        <CustomVideo
            ref={ref}
            {...props}
        >
        </CustomVideo>
    )
}

export default React.memo(React.forwardRef(VideoPlayer))