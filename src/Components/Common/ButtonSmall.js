import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const ButtonSmall = styled(Button)`
    && {
        color: white;
        font-size: ${props => props.fontsize || '10px'};
        background: ${props => props.background || 'transparent'};
        border-radius: 10px;
        &:hover {
            background:${props => props.background || 'transparent'};
        }
    }
`

export default React.memo(ButtonSmall);