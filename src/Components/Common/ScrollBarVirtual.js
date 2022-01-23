import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import { useVirtual } from "react-virtual";
import Divider from '@mui/material/Divider';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
function ScrollBarVirtual(props) {
    const {items, fetchNextPage, rowHeight=60, heightMinus="220px", ItemElement, itemProps} = props;
    const [scrollRefTime, setScrollRefTime] = React.useState(Date.now());
    const parentRef = React.useRef();
    const rowVirtualizer = useVirtual({
        size: items.length,
        overscan: 10,
        parentRef,
        estimateSize: React.useCallback(() => rowHeight, [rowHeight])
    });
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    React.useEffect(() => console.log('^^^ items changed'),[items])
    React.useEffect(() => console.log('^^^ parentRef changed'),[parentRef])
    React.useEffect(() => console.log('^^^ rowHeight changed'),[rowHeight])
    React.useEffect(() => console.log('^^^ rowVirtualizer changed'),[rowVirtualizer])
    React.useEffect(() => console.log('^^^ fullViewHeightMediaQuery changed'),[fullViewHeightMediaQuery])
    return (
        <ScrollBarSmooth
            getMoreItem={fetchNextPage} 
            height={`calc(${fullViewHeightMediaQuery} - ${heightMinus})`}
            ref={parentRef}
            refreshRefByTime={setScrollRefTime}
        > 
            <div
                style={{
                height: `${rowVirtualizer.totalSize}px`,
                width: "100%",
                position: "relative"
                }}
            >
                {rowVirtualizer.virtualItems.map(virtualRow => {
                    const item = items[virtualRow.index];
                    console.log(`^^^ ${item.id}::${virtualRow.index}`)
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
                            <Box key={item.id} px="10px">
                                <ItemElement
                                    rownum={virtualRow.index}
                                    fontSize="14px"
                                    color="white"
                                    item={item}
                                    width="100%"
                                    {...itemProps}
                                ></ItemElement>
                                <Divider opacity="0.2" margin="0px" mr={"15px"}></Divider>
                            </Box>
                        </div>
                    );                        
                })}
                {/* <SongListInSearchAll renderIfVisible={false} rootRef={rootForObservation} songs={songs}></SongListInSearchAll> */}
            </div>
        </ScrollBarSmooth>
    )
}

export default React.memo(ScrollBarVirtual);