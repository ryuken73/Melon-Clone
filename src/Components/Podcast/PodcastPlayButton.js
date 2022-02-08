import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useQueryPodcastDetail from 'hooks/useQueryPodcastDetail';
import {apiMap} from 'config/apis';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';

const PodcastPlayButton = props => {
    const {media_id, podcast, size="small", playAfterAdd=true} = props;
    // console.log('archive:', archive)
    const Icon = playAfterAdd ? PlayArrowIcon : AddIcon;
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
            addSongsToCurrentPlaylist(podcast, playAfterAdd)
        })
    },[queryDetail, podcast, playAfterAdd, addSongsToCurrentPlaylist])
    return (
        <Icon
            onClick={addSongNPlay}
            size={size}
        >
        </Icon>
    );
};

export default React.memo(PodcastPlayButton);