import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import colors from '../../config/colors';

const Container = styled(Box)`
    && {
        height: ${props => props.height || "auto"};
        width: ${props => props.width || "auto"};
        max-width: ${props => props.maxwidth || "100%"};
        margin: ${props => props.margin || "0px"};
        text-align: ${props => props.textalign || "left"};
    }

`
const Text = styled(Box)`
    font-size: ${props => props.fontSize || "12px"};
    color: ${props => props.color || "darkgrey"};
    font-weight: ${props => props.fontWeight || "bold"};
    opacity: ${props => props.opacity || "0.8"};
    cursor: ${props => props.cursor || "pointer"};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
        opacity: ${props => props.opacityOnHover || "1"};  

    }
`

const TextBox = props => {
    const {
        onClick=()=>{},
        text="Text",
        containerProps={}
    } = props;
    return (
        <Container {...containerProps}>
            <Text
                onClick={onClick}
                {...props}
            >
                {text}
            </Text>
        </Container>
    )
}

export default React.memo(TextBox);