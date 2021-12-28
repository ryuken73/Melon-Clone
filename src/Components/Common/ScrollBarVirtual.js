import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import { useVirtual } from "react-virtual";
import SongIteminSearchAll from 'Components/Song/SongIteminSearchAll';
import Divider from '@mui/material/Divider';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function ScrollBarVirtual(props) {
    const {songs, fetchNextPage, rowHeight=60, heightMinus="220px"} = props;
    const [scrollRefTime, setScrollRefTime] = React.useState(Date.now());
    const category="";
    const replaceRequired = false;
    const parentRef = React.useRef();
    const rowVirtualizer = useVirtual({
        size: songs.length,
        overscan: 10,
        parentRef,
        estimateSize: React.useCallback(() => rowHeight, [rowHeight])
    });
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
            <div
                style={{
                height: `${rowVirtualizer.totalSize}px`,
                width: "100%",
                position: "relative"
                }}
            >
                {rowVirtualizer.virtualItems.map(virtualRow => {
                    const song = songs[virtualRow.index];
                    console.log(`${song.id}::${virtualRow.index}`)
                    return (
                        <div
                            key={virtualRow.index}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`
                            }}
                        >
                            <Box key={song.id} px="10px">
                                <SongIteminSearchAll
                                    rownum={virtualRow.index}
                                    fontSize="14px"
                                    color="white"
                                    song={song}
                                    width="100%"
                                ></SongIteminSearchAll>
                                <Divider opacity="0.2" margin="0px" mr={"15px"}></Divider>
                            </Box>
                        </div>
                    );                        
                })}
                {/* <SongListInSearchAll renderIfVisible={false} rootRef={rootForObservation} songs={songs}></SongListInSearchAll> */}
            </div>
        </ScrollBarWithColor>
    )
}

export default React.memo(ScrollBarVirtual);