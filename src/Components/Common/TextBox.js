import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    margin: ${props => props.margin || "0px"};
`
const Text = styled(Box)`
    font-size: ${props => props.fontSize || "12px"};
    color: ${props => props.color || "darkgrey"};
    font-weight: ${props => props.fontWeight || "bold"};
`

const TextBox = props => {
    const {
        onClick=()=>{},
        text="Text"

    } = props;
    return (
        <Container>
            <Text
                onClick={onClick}
                {...props}
            >
                {text}
            </Text>
        </Container>
    )
}

export default TextBox;