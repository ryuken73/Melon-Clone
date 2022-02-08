import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import PodcastListTitle from 'Components/Podcast/PodcastListTitle';
import PodcastListHeader from 'Components/Podcast/PodcastListHeader';
import ScrollBarVirtual from 'Components/Common/ScrollBarVirtual'; 
import PodcastListItem from 'Components/Podcast/PodcastListItem';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useInfiniteData from 'hooks/useInfiniteData';
import useQueryPodcastProgram from 'hooks/useQueryPodcastProgram';
import CONSTANTS from 'config/constants';
import createPodcastProgram from 'lib/podcastProgramClass';
const {PODCAST_PAGE_SIZE=50} = CONSTANTS;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
const PodcastList = props => {
    const {match} = props;
    const {pgm_cd} = match.params;
    const params = {
        scn: 'podcast',
        query: `audio_pgm_id='${pgm_cd}'`,
        orderby: 'order by brad_day desc'
    }
    const {data, fetchNextPage, isFetching} = useSearchMusicAllInfinite({
        params, 
        page_num:1, 
        page_sizes:PODCAST_PAGE_SIZE
    })
    const [podcasts=[], total] = useInfiniteData(data, 'podcasts');
    const ENABLED = true;
    const result = useQueryPodcastProgram(pgm_cd, ENABLED);
    const programResult = result.isSuccess ? result.data.get:{};
    const program = createPodcastProgram(programResult);
    console.log(podcasts, program, total);
    const podcastsWithImage = podcasts.map(podcast => {
        podcast.albumImgSrc = program.eval_imagePath;
        return podcast;
    })
    // const chan_cd_full = archives.length > 0 ? archives[0].chan_cd_full:'-';
    // const chan_cd = archives.length > 0 ? archives[0].chan_cd:'A';
    return (
        <Container>
            <PodcastListTitle
                program={program}
                total={total}
            >
            </PodcastListTitle>
            <PodcastListHeader
                archives={podcastsWithImage}
                total={total}
            >
            </PodcastListHeader>
            <ScrollBarVirtual
                items={podcastsWithImage}
                fetchNextPage={fetchNextPage}
                rowHeight={57}
                heightMinus="200px"
                ItemElement={PodcastListItem}
            ></ScrollBarVirtual>
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(PodcastList); 