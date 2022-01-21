import React from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-smooth-scrollbar'

const StyledScrollbar = styled(Scrollbar)`
    height: ${props => props.height};
    width: ${props => props.width};

`

const ScrollBarSmooth = props => {
    const {height='100%', width='100%'} = props;
    const {getMoreItem=()=>{}} = props;
    const handleScroll = React.useCallback(scroll => {
        // console.log(scroll.offset.y, scroll.limit.y)
        const haveReachedBottom = scroll.offset.y === scroll.limit.y;
        if(haveReachedBottom){
            getMoreItem();
        }
    },[])
    return (
        <StyledScrollbar
            height={height}
            width={width}
            onScroll={handleScroll}
        >
            {props.children}
        </StyledScrollbar>
    )
}

export default ScrollBarSmooth;