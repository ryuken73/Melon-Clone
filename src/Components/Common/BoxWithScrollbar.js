import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

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
    console.log(props)
    return (
        <ScrollBarWithColor autoHide style={{width:'auto', height: '100vh' }}>
            <Container>
                {props.children}
            </Container>
        </ScrollBarWithColor>
    )
}

export default React.memo(BoxWithScrollbar);