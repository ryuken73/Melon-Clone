import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import styled from 'styled-components'
import useQueryPodcastDetail from 'hooks/useQueryPodcastDetail';
import {apiMap} from 'config/apis';
import createArchiveBora from 'lib/archiveBoraClass';
import useDownloadSong from 'hooks/useDownloadSong';

const SmallDownloadIcon = styled(FileDownloadIcon)`
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

const PodcastDownloadButton = props => {
    const {media_id, podcast, size="small"} = props;
    // console.log('archive:', archive)
    const queryDetail = useQueryPodcastDetail(media_id);
    const downloadFile = useDownloadSong([podcast]);
    // const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const downloadPodcast = React.useCallback(() => {
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
            downloadFile([podcast], true)
        })
    },[queryDetail, podcast, downloadFile])
    return (
        <SmallDownloadIcon
            onClick={downloadPodcast}
            size={size}
        >
        </SmallDownloadIcon>
    );
};

export default React.memo(PodcastDownloadButton);