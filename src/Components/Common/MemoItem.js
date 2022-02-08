import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const MemoItem = props => {
    const {size, start, item, index, ItemElement, scrollToIndex, ...itemProps} = props
    // const scrollTo = React.useCallback(() => {
    //     // scrollToIndex(55, {align:'start'})
    //     scrollToX();
    // },[scrollToX])
    console.log(`^^^ ${item.id}::${index}`)
    return (
        <div
            key={index}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${size}px`,
                transform: `translateY(${start}px)`,
                transition: 'all 5s'
            }}
        >
            <Box key={item.id} px="10px">
                <ItemElement
                    rownum={index}
                    fontSize="14px"
                    color="white"
                    item={item}
                    width="100%"
                    {...itemProps}
                ></ItemElement>
                <Divider opacity="0.2" margin="0px" mr={"15px"}></Divider>
            </Box>
        </div>
    )
}

export default React.memo(MemoItem)
