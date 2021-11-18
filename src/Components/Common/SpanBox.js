import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
    font-size: ${props => props.fontSize || "12px"};
    color: ${props => props.color || "darkgrey"};
    font-weight: ${props => props.fontWeight || "bold"};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`

const SpanBox = props => {
    const {
        onClick=()=>{},
        text="Text"
    } = props;
    return (
            <Span
                onClick={onClick}
                {...props}
            >
                {text}
            </Span>
    )
}

export default React.memo(SpanBox);