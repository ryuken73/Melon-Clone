import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import { useVirtual } from "react-virtual";
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SongIteminSearchAll from 'Components/Song/SongIteminSearchAll';
import Divider from '@mui/material/Divider';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function ScrollBarRenderIfShow(props) {
    const {songs, fetchNextPage, heightMinus="220px"} = props;
    const category="";
    const replaceRequired = false;
    const parentRef = React.useRef();
    const [scrollRefTime, setScrollRefTime] = React.useState(Date.now());
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor
            moveScrollToTop={replaceRequired} 
            getMoreItem={fetchNextPage} 
            category={category}
            autoHide 
            style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - ${heightMinus})`}}
            ref={parentRef}
            setScrollRefTime={setScrollRefTime}
        >
            <SongListInSearchAll renderIfVisible={true} scrollRefTime={scrollRefTime} rootRef={parentRef} songs={songs}></SongListInSearchAll>
        </ScrollBarWithColor>
    )
}

export default React.memo(ScrollBarRenderIfShow);