import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import CONSTANTS from '../../config/constants.js';


const Track = styled(Box)`
    padding: ${props => props.viewPadding || 15};
    background: ${props => props.viewBackgroundColor || 'blue'};
    color: ${props => props.viewColor || 'yellow'};
`

const Thumb = styled(Box)`
    background: ${props => props.thumbColor || 'grey'};
    width: 5px !important;
    &:hover {
        background: yellow;
    }
    &:active {
        background: yellow;
    }
    &::after {
        content:'';
        position:absolute;
        top:-10px; bottom:-10px; 
        left:-10px; right:-10px; 
    }
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

const getShownIndexRange = (clientHeight, scrollTop, scrollHeight) => {
    const canBeShownCount = Math.floor(clientHeight / ROW_HEIGHT)
    const fromIndex = Math.ceil(scrollTop / ROW_HEIGHT)
    return {from: fromIndex, to: fromIndex + canBeShownCount - 1}
}

const ROW_HEIGHT=35;
const ScrollBarWithColor = (props, ref) => {
    const {getMoreItem=()=>{}, moveScrollToTop=false, category} = props;
    // below can make too may re-render, if setScrollRefTime is not in props
    const {setScrollRefTime=()=>{}} = props;
    const [t, setT] = React.useState(0);
    const [notMoveScroll, setNotMoveScroll] = React.useState(false);
    const scrollbar = React.useRef(null);
    const [parentRef, setParentRef] = React.useState(ref);
    const {currentPlaylistIndex} = useCurrentPlaylist();

    React.useEffect(() => console.log('^^^ moveScrollToTop changed'),[moveScrollToTop])
    React.useEffect(() => console.log('^^^ parentRef changed'),[parentRef])
    React.useEffect(() => console.log('^^^ setScrollRefTime changed:', setScrollRefTime),[setScrollRefTime])
    React.useEffect(() => console.log('^^^ scrollbar changed'),[scrollbar])
    React.useEffect(() => console.log('^^^ notMoveScroll changed'),[notMoveScroll])
    React.useEffect(() => console.log('^^^ category changed'),[category])
    React.useEffect(() => console.log('^^^ props.children changed:', props.children),[props.children])

    React.useEffect(() => {
        console.log(scrollbar.current)
        const {getClientHeight, getScrollHeight, getScrollTop, getScrollTopForOffset} = scrollbar.current;
        const shownIndexRange = getShownIndexRange(getClientHeight(), getScrollTop(), getScrollHeight());
        const {from, to} = shownIndexRange;
        if(currentPlaylistIndex === -1) return;
        const isHidden = currentPlaylistIndex < from || currentPlaylistIndex > to; 
        if(isHidden){
            scrollbar.current.scrollTop((currentPlaylistIndex - 1)*ROW_HEIGHT)
        }
    },[currentPlaylistIndex,scrollbar])

    React.useEffect(()=>{
        console.log('^^^ in scroll effect!')
        if(scrollbar === null) return;
        if(parentRef){
            // console.log('^^^^', parentRef, scrollbar)
            if(parentRef.current !== scrollbar.current.view) {
                // console.log(' set ^^^^', parentRef, scrollbar)
                setParentRef(ref => {
                    ref.current = scrollbar.current.view; 
                    setScrollRefTime(Date.now())
                })
            }
        }
        if(notMoveScroll) {
            setNotMoveScroll(false);
            return;
        }
        if(moveScrollToTop){
            console.log('scroll to top:', scrollbar.current)
            moveScrollToTop && scrollbar.current.scrollTop();
        }
    },[moveScrollToTop, parentRef, setScrollRefTime, scrollbar, notMoveScroll, category]) 


    const RenderTrack = ({ style, ...props }) => {
        console.log(style)
        return <Track style={{...style}} {...props} ></Track>
    }
    const RenderThumb = ({ style, ...props }) => {
        return <Thumb style={{...style}} {...props} ></Thumb>
    }

    const handleAboutToReachBottom = React.useCallback(() => {
        console.log('^^^^^^^^^ reach to bottom')
        setNotMoveScroll(true)
        getMoreItem();
    },[getMoreItem])

    const debouncedValue = useDebounce(t, CONSTANTS.GET_MORE_WAIT_SEC_DEBOUNCE);

    React.useEffect(() => {
        if (debouncedValue > 1) handleAboutToReachBottom();
    },[debouncedValue, handleAboutToReachBottom])    

    const handleUpdate = React.useCallback(values => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        console.log(scrollTop, scrollHeight, clientHeight)

        if(scrollTop === 0) return; // not enough rows;
        const pad = 1; // 100px of the bottom
        // t will be greater than 1 if we are about to reach the bottom
        const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
        setT(t);
        // if (t > 1) handleAboutToReachBottom();
    },[])

    return (
        <Scrollbars
            // renderTrackVertical={RenderTrack}
            // renderTrackHorizontal={RenderTrack}
            {...props}
            // renderThumbHorizontal={RenderThumb}
            onUpdate={handleUpdate}
            renderThumbVertical={RenderThumb}
            ref={scrollbar}
        >
            {/* {props.children} */}
        </Scrollbars>
    )
}

export default React.memo(React.forwardRef(ScrollBarWithColor))
