import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const ButtonSmall = styled(Button)`
    && {
        color: white;
        font-size: ${props => props.fontsize || '10px'};
        background: ${props => props.background || 'transparent'};
        border-radius: 10px;
        border: ${props => props.border || 'none'}; 
        &:hover {
            background:${props => props.hoverBackground || 'transparent'};
            border: ${props => props.hoverBorder || 'none'};

        }
    }
`

export default React.memo(ButtonSmall);