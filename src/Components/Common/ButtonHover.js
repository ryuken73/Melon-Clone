import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';

const HoverButton = styled(IconButton)`
    &.Mui-disabled {
        opacity: ${props => props.opacityDisabled || '0.3'};
    }
    .MuiSvgIcon-root {
        color: ${props => props.color || 'white'};
        opacity: ${props => props.opacitynormal || '0.5'};
        &:hover {
            opacity: ${props => props.opacityhover || '0.7'};
            /* color: white; */
        }
    }
`

export default React.memo(HoverButton);
