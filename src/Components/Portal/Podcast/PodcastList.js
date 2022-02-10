import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import PodcastItem from 'Components/Portal/Podcast/PodcastItem'; 
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import CONSTANTS from 'config/constants';

const {MAX_COLUMNS_FOR_PODCASTLIST} = CONSTANTS;

const Container = styled(Box)`
    display: grid;
    grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)`: MAX_COLUMNS_FOR_PODCASTLIST};
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "100%"};
`
function PodcastList(props) {
    const {podcasts} = props;
    const {show2ColPodcastList, show3ColPodcastList} = useMediaQueryEasy();
    const columns = show2ColPodcastList ? 2 : show3ColPodcastList ? 2 : MAX_COLUMNS_FOR_PODCASTLIST;
    const podcastsToShow = 
        show2ColPodcastList ? podcasts.slice(0,6) :
        show3ColPodcastList ? podcasts.slice(0,8) :
        podcasts.slice(0,8)
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