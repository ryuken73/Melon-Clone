import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumInfoTable from './AlbumInfoTable';
import ScrollBarWithColor from 'Components/Common/ScrollBarWithColor';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`

const AlbumDetailInfo = props => {
    const {match} = props;
    const {receipt_no} = match.params;
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <Container>
            {/* <ScrollBarWithColor 
                autoHide 
                style={{width:'100%', height:`calc(${fullViewHeightMediaQuery} - 258px)`}}
            > */}
            <ScrollBarSmooth
                height={`calc(${fullViewHeightMediaQuery} - 258px)`}
            >
                <AlbumInfoTable receipt_no={receipt_no} ></AlbumInfoTable>
            </ScrollBarSmooth>
            {/* </ScrollBarWithColor> */}
        </Container>
    )
}

export default React.memo(AlbumDetailInfo)