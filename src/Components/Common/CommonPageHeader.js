import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const Container = styled(Box)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background: transparent;
    position: relative;
    margin-left: 15px;
    /* margin-right: 10px; */
`

const CommonPageHeader = props => {
    const {children} = props;
    return (
        <Container>
            {children}
        </Container>
    )
}

export default React.memo(CommonPageHeader);
