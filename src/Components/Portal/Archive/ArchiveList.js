import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import ArchiveItem from 'Components/Portal/Archive/ArchiveItem'; 
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import CONSTANTS from 'config/constants';

const {MAX_COLUMNS_FOR_ARCHIVELIST} = CONSTANTS;

const Container = styled(Box)`
    display: grid;
    grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)`: MAX_COLUMNS_FOR_ARCHIVELIST};
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "100%"};
`
function ArchiveList(props) {
    const {groupedArchives} = props;
    const {show2ColArchiveList, show3ColArchiveList} = useMediaQueryEasy();
    // const columns = show2ColArchiveList ? 2 : show3ColArchiveList ? 3 : MAX_COLUMNS_FOR_ARCHIVELIST;
    const columns = show2ColArchiveList ? 1 : MAX_COLUMNS_FOR_ARCHIVELIST;
    const archivesToShow = 
        show2ColArchiveList ? groupedArchives.slice(0,4) :
        show3ColArchiveList ? groupedArchives.slice(0,8) :
        groupedArchives.slice(0,8)
    return (
        <Container columns={columns}>
            {archivesToShow.map((archives, index) => (
                <ArchiveItem
                    key={archives.pgm_cd}
                    index={index}
                    archives={archives}
                ></ArchiveItem>
            ))}
            
        </Container>
    )
}

export default React.memo(ArchiveList)