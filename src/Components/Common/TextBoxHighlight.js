import React from 'react';
import TextBox from './TextBox';

const TextBoxHighlight = props => {
    const {text, active} = props;
    const opacity = active === true ? "1" : "0.7";
    const color = active === true ? "yellow" : "grey";
    return (
        <TextBox 
            fontSize="14px" 
            color={color}
            opacity={opacity}
            opacityOnHover="0.9" 
            text={text}
            {...props}>
        </TextBox>
    )
}

export default TextBoxHighlight;