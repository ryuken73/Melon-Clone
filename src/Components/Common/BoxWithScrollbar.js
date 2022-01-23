import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
        color: white;
        background: transparent;
        overflow:hidden;
    }
`

const BoxWithScrollbar = props => {
    console.log('^^^ re-render BoxWithScrollbar')
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor autoHide style={{width:'auto', height: fullViewHeightMediaQuery}}>
            <Container>
                {props.children}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(BoxWithScrollbar);