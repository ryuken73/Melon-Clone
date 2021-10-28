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

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    React.useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

const ScrollBarWithColor = props => {
    const {getMoreItem=()=>{}} = props;
    const [t, setT] = React.useState(0);
    const debouncedValue = useDebounce(t, 500);

    const RenderTrack = ({ style, ...props }) => {
        console.log(style)
        return <Track style={{...style}} {...props} ></Track>
    }
    const RenderThumb = ({ style, ...props }) => {
        return <Thumb style={{...style}} {...props} ></Thumb>
    }
    const handleAboutToReachBottom = React.useCallback(() => {
        // console.log('reach to bottom')
        getMoreItem();
    },[getMoreItem])

    React.useEffect(() => {
        if (debouncedValue > 1) handleAboutToReachBottom();
    },[debouncedValue, handleAboutToReachBottom])    

    const handleUpdate = React.useCallback(values => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        // console.log(scrollTop, scrollHeight, clientHeight)
        const pad = 1; // 100px of the bottom
        // t will be greater than 1 if we are about to reach the bottom
        const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
        setT(t);
        // if (t > 1) handleAboutToReachBottom();
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
