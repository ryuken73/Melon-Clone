import { RestartAltSharp } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';

const ColoredDivider = styled.hr`
    height: ${props => props.height};
    border-width: ${props => props.width};
    border-color: ${props => props.color};
    opacity: ${props => props.opacity || 0.5};
    margin: ${props => props.margin || "8px"};
    border-style: inset;
`

const Divider = props => {
    const {color='grey', width='100%', height="0px", ...rest} = props;
    return (
        <ColoredDivider color={color} width={width} height={height} {...rest}>
        </ColoredDivider>
    )
}

export default React.memo(Divider);