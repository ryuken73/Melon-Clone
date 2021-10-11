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
    console.log(props)
    const RenderTrack = ({ style, ...props }) => {
        console.log(style)
        return <Track style={{...style}} {...props} ></Track>
    }
    const RenderThumb = ({ style, ...props }) => {
        return <Thumb style={{...style}} {...props} ></Thumb>
    }
    return (
        <Scrollbars
            // renderTrackVertical={RenderTrack}
            // renderTrackHorizontal={RenderTrack}
            {...props}
            renderThumbHorizontal={RenderThumb}
            renderThumbVertical={RenderThumb}

        >
            {/* {props.children} */}
        </Scrollbars>
    )
}

export default React.memo(ScrollBarWithColor)
