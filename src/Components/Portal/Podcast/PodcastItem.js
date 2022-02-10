import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import TextBox from 'Components/Common/TextBox'
import PodcastPlayLink from 'Components/Portal/Podcast/PodcastPlayLink';
import useQueryPodcastDetail from 'hooks/useQueryPodcastDetail';
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
    const {pgm_title, brad_day_with_weekday, media_id, episode_title} = podcast;
    const {refetch} = useQueryPodcastDetail(media_id);
    const rownum = index + 1;

    const onClickTitle = React.useCallback(() => {
        refetch()
        .then(result => {
            const {audio_pgm_id} = result.data.get
            history.push(`/podcast/${audio_pgm_id}/podcastList`);
        })
    },[history, refetch])

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
                    onClick={onClickTitle}
                ></TextBox>
                <Box ml="auto" minWidth="120px" mr="20px">
                    <TextBox opacity="0.5" text={`${brad_day_with_weekday}`}></TextBox>
                </Box>
            </RowContainer>
            <PodcastPlayLink 
                media_id={media_id}
                podcast={podcast}
            ></PodcastPlayLink>
            {/* <TextBox text={episode_title}></TextBox> */}
        </Container>
    )
}

export default React.memo(withRouter(PodcastItem));