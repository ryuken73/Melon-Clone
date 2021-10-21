import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const Track = styled(Box)`
    padding: ${props => props.viewPadding || 15};
    background: ${props => props.viewBackgroundColor || 'blue'};
    color: ${props => props.viewColor || 'yellow'};
`

const Thumb = styled(Box)`
    background: ${props => props.thumbColor || 'grey'};
    height: 15px;
    width: 2px !important;
`

const ScrollBarWithColor = props => {
    const {getMoreItem=()=>{}} = props;
    const RenderTrack = ({ style, ...props }) => {
        console.log(style)
        return <Track style={{...style}} {...props} ></Track>
    }
    const RenderThumb = ({ style, ...props }) => {
        return <Thumb style={{...style}} {...props} ></Thumb>
    }
    const handleAboutToReachBottom = React.useCallback(() => {
        console.log('reach to bottom')
        getMoreItem();
    },[getMoreItem])
    const handleUpdate = React.useCallback(values => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const pad = 1; // 100px of the bottom
        // t will be greater than 1 if we are about to reach the bottom
        const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
        if (t > 1) handleAboutToReachBottom();
    },[handleAboutToReachBottom])


    return (
        <Scrollbars
            // renderTrackVertical={RenderTrack}
            // renderTrackHorizontal={RenderTrack}
            {...props}
            // renderThumbHorizontal={RenderThumb}
            onUpdate={handleUpdate}
            renderThumbVertical={RenderThumb}

        >
            {/* {props.children} */}
        </Scrollbars>
    )
}

export default React.memo(ScrollBarWithColor)
