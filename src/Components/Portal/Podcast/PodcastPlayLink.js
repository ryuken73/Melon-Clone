import React from 'react';
import TextBox from 'Components/Common/TextBox';
import SmartDisplay from '@mui/icons-material/SmartDisplay'
import styled from 'styled-components'
import useQueryPodcastDetail from 'hooks/useQueryPodcastDetail';
import {apiMap} from 'config/apis';
import createPodcastDetail from 'lib/podcastDetailClass';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';

const SmallSmartDisplay = styled(SmartDisplay)`
    /* font-size: 16px !important; */
    font-size: ${props => props.size === 'medium' ? '20px !important':'16px !important'};
    color: white;
    opacity: 0.5;
    cursor: pointer;
    margin-left: 2px;
    &:hover {
        opacity: 0.9;
    }
`

const PodcastPlayLink = props => {
    const {media_id, podcast} = props;
    // console.log('archive:', archive)
    const {pgm_title, brad_day_with_weekday, episode_title} = podcast;
    const queryDetail = useQueryPodcastDetail(media_id);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const addSongNPlay = React.useCallback(() => {
        queryDetail.refetch()
        .then(async result => {
            console.log('^^^', result)
            const audio_pgm_tms_id = result.data.get.audio_pgm_tms_id;
            podcast.ops_id = audio_pgm_tms_id;
            const {url, fetchOptions} = apiMap['queryMediaUrl'](audio_pgm_tms_id);
            const response = await fetch(url, fetchOptions);
            return response.json()
        })
        .then(result => {
            console.log('^^^^', result)
            const {audio_media_url} = result;
            podcast.src = audio_media_url;
            addSongsToCurrentPlaylist(podcast, true)
        })
    },[queryDetail, podcast, addSongsToCurrentPlaylist])
    return (
        <TextBox
            text={episode_title}
            onClick={addSongNPlay}
        >
        </TextBox>
    );
};

export default React.memo(PodcastPlayLink);