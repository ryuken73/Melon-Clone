import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import ArchiveItem from 'Components/Portal/Archive/ArchiveItem'; 
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: ${props => props.smallViewport ? '1fr 1fr': '1fr 1fr 1fr 1fr'};
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "100%"};
`
function ArchiveList(props) {
    const {groupedArchives} = props;
    const {showMiniArchiveList} = useMediaQueryEasy();
    const archivesToShow = showMiniArchiveList ? groupedArchives.slice(0,10):groupedArchives
    return (
        <Container smallViewport={showMiniArchiveList}>
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