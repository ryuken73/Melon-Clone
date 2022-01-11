import React from 'react';
import SmartDisplay from '@mui/icons-material/SmartDisplay'
import styled from 'styled-components'
import useQueryArchiveDetail from 'hooks/useQueryArchiveDetail';
import {apiMap} from 'config/apis';
import createArchiveBora from 'lib/archiveBoraClass';
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

const ArchiveBoraPlayButton = props => {
    const {media_id, archive, size="small"} = props;
    // console.log('archive:', archive)
    const queryDetail = useQueryArchiveDetail(media_id);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const addVideoNPlay = React.useCallback(() => {
        queryDetail.refetch()
        .then(async result => {
            const asset_id = result.data.ops_get[0].ops_content_id;
            const bora_archive_yn = result.data.get.bora_archive_yn;
            const {url, fetchOptions} = apiMap['doListBoraRadioAttach.mb'](asset_id, bora_archive_yn);
            const response = await fetch(url, fetchOptions);
            return response.json()
        })
        .then(result => {
            const resultOpsItem = result.get.items[0];
            const archiveBora = createArchiveBora(resultOpsItem);
            const mergedArchive = {...archive.parsed, ...archiveBora.parsed}
            addSongsToCurrentPlaylist(mergedArchive, true)
        })
    },[queryDetail, archive, addSongsToCurrentPlaylist])
    return (
        <SmallSmartDisplay
            onClick={addVideoNPlay}
            size={size}
        >
        </SmallSmartDisplay>
    );
};

export default React.memo(ArchiveBoraPlayButton);