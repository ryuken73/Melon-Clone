import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import TextBox from 'Components/Common/TextBox'
import useCurrentPlaylist from 'hooks/useCurrentPlaylist'
import {withRouter} from 'react-router-dom'
import CONSTANTS from 'config/constants';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: 'center';
    margin-top: 8px;
`
const RowContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: 'center';
`
const RowReverseContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: 'center';
`

function PodcastItem(props) {
    const {showShortArchiveList} = useMediaQueryEasy();
    const {index, podcast, history} = props
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {pgm_title, brad_day_with_weekday, episode_title} = podcast;
    const rownum = index + 1;

    const UPDATE_TEXT = showShortArchiveList ? 'Last Updated: ' : 'Updated';
    return (
        <Container>
            <RowContainer>
                <Box flexShrink={0} minWidth="20px">
                    <TextBox fontSize="14px" color="white" text={`${rownum}.`}></TextBox>
                </Box>
                <TextBox 
                    clickable
                    fontSize="14px" 
                    color="white" 
                    text={pgm_title}
                ></TextBox>
                <Box ml="auto" minWidth="120px" mr="20px">
                    <TextBox opacity="0.5" text={`${brad_day_with_weekday}`}></TextBox>
                </Box>
            </RowContainer>
            <TextBox text={episode_title}></TextBox>
        </Container>
    )
}

export default React.memo(withRouter(PodcastItem));