import React from 'react'
import styled from 'styled-components';

const ColoredDivider = styled.hr`
    height: ${props => props.height};
    border-width: ${props => props.width};
    border-color: ${props => props.color};
    border-style: groove;
    opacity: 0.5;
`

const Divider = props => {
    const {color='grey', width='100%', height="1px"} = props;
    return (
        <ColoredDivider color={color} width={width} height={height}>
        </ColoredDivider>
    )
}

export default React.memo(Divider);