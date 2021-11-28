import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import LyricsItemInSearchAll from 'Components/Lyrics/LyricsItemInSearchAll';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`

function LyricsListInSearchAll(props) {
    const {lyrices=[]} = props;
    return (
        <Container>
            {lyrices.map((lyrics, index) => (
                <Box key={lyrics.id}>
                    <LyricsItemInSearchAll
                        id={lyrics.id}
                        lyrics={lyrics}
                    >
                    </LyricsItemInSearchAll>
                </Box>
            ))}
            
        </Container>
    )
}

export default React.memo(LyricsListInSearchAll)