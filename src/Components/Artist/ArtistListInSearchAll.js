import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArtistIteminSearchAll from 'Components/Artist/ArtistIteminSearchAll' ;

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
`

function ArtistListInSearchAll(props) {
    const {artists=[]} = props;
    return (
        <Container>
            {artists.map(artist => (
                <ArtistIteminSearchAll artist={artist}></ArtistIteminSearchAll>
            ))}
        </Container>
    )
}

export default React.memo(ArtistListInSearchAll);