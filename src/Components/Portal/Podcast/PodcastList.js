import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import PodcastItem from 'Components/Portal/Podcast/PodcastItem'; 
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import CONSTANTS from 'config/constants';

const {MAX_COLUMNS_FOR_ARCHIVELIST} = CONSTANTS;

const Container = styled(Box)`
    display: grid;
    grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)`: MAX_COLUMNS_FOR_ARCHIVELIST};
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "100%"};
`
function PodcastList(props) {
    const {podcasts} = props;
    const {show2ColArchiveList, show3ColArchiveList} = useMediaQueryEasy();
    const columns = show2ColArchiveList ? 2 : show3ColArchiveList ? 3 : MAX_COLUMNS_FOR_ARCHIVELIST;
    const podcastsToShow = 
        show2ColArchiveList ? podcasts.slice(0,6) :
        show3ColArchiveList ? podcasts.slice(0,9) :
        podcasts.slice(0,12)
    return (
        <Container columns={columns}>
            {podcastsToShow.map((podcast, index) => (
                <PodcastItem
                    key={podcast.id}
                    index={index}
                    podcast={podcast}
                ></PodcastItem>
            ))}
            
        </Container>
    )
}

export default React.memo(PodcastList)