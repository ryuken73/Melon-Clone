import React from 'react';
import Box from '@mui/material/Box';
import styled, {keyframes} from 'styled-components';

// https://codepen.io/MoritzGiessmann/pen/XWWovQP
const Container = styled(Box)`
    background: transparent;
    height: 10px;
    width: 10px;
    border-radius: 1px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1px;
    box-sizing: border-box;
`
const UpnDown = keyframes`
        10% {
            height: 30%;
        }
        30% {
            height: 100%;
        }
        60% {
            height: 50%;
        }
        80% {
            height: 75%;
        }
        100% {
            height: 60%;
        }
`
const Bar = styled(Box)`
    display: inline-block;
    background: red;
    width: 30%;
    height: 100%;
    animation: ${UpnDown} 1.3s ease infinite alternate;
`

const Bar1 = styled(Bar)`
    height: 60%;
`
const Bar2 = styled(Bar)`
    height: 30%;
    animation-delay: -2.2s;
`
const Bar3 = styled(Bar)`
    height: 75%;
    animation-delay: -3.7s;
`
function PlayingIcon(props) {
    return (
        <Container>
            <Bar1></Bar1>
            <Bar2></Bar2>
            <Bar3></Bar3>
        </Container>
    );
}

export default React.memo(PlayingIcon);