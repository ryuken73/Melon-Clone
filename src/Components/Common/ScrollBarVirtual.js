import React from 'react';
import MemoItem from 'Components/Common/MemoItem';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
// import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import { useVirtual } from "react-virtual";
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

function ScrollBarVirtual(props) {
    const {items, fetchNextPage, rowHeight=60, heightMinus="220px", ItemElement, itemProps} = props;
    const [scrollRefTime, setScrollRefTime] = React.useState(Date.now());
    // const category="";
    // const replaceRequired = false;
    const parentRef = React.useRef();
    const rowVirtualizer = useVirtual({
        size: items.length,
        overscan: 10,
        parentRef,
        estimateSize: React.useCallback(() => rowHeight, [rowHeight]),
    });
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    // React.useEffect(() => console.log('^^^ items changed'),[items])
    // React.useEffect(() => console.log('^^^ parentRef changed'),[parentRef])
    // React.useEffect(() => console.log('^^^ rowHeight changed'),[rowHeight])
    // React.useEffect(() => console.log('^^^ fullViewHeightMediaQuery changed'),[fullViewHeightMediaQuery])

   return (
        // <ScrollBarWithColor
        //     moveScrollToTop={replaceRequired} 
        //     getMoreItem={fetchNextPage} 
        //     category={category}
        //     autoHide 
        //     style={{ width:'100%', height: `calc(${fullViewHeightMediaQuery} - ${heightMinus})`}}
        //     ref={parentRef}
        //     setScrollRefTime={setScrollRefTime}
        // >
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
                    return (
                        <MemoItem
                            item={item}
                            index={virtualRow.index}
                            size={virtualRow.size}
                            start={virtualRow.start}
                            ItemElement={ItemElement}
                            {...itemProps}
                        ></MemoItem>
                    );                        
                })}
                {/* <SongListInSearchAll renderIfVisible={false} rootRef={rootForObservation} songs={songs}></SongListInSearchAll> */}
            </div>
        </ScrollBarSmooth>
        // {/* </ScrollBarWithColor> */}
    )
}

export default React.memo(ScrollBarVirtual);