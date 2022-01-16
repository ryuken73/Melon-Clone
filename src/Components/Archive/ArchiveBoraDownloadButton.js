import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import styled from 'styled-components'
import useQueryArchiveDetail from 'hooks/useQueryArchiveDetail';
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

const ArchiveBoraDownloadButton = props => {
    const {media_id, archive, size="small"} = props;
    // console.log('archive:', archive)
    const queryDetail = useQueryArchiveDetail(media_id);
    const downloadFile = useDownloadSong([archive]);
    // const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const downloadBoraArchive = React.useCallback(() => {
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
            downloadFile([mergedArchive], true)
        })
    },[queryDetail, archive, downloadFile])
    return (
        <SmallDownloadIcon
            onClick={downloadBoraArchive}
            size={size}
        >
        </SmallDownloadIcon>
    );
};

export default React.memo(ArchiveBoraDownloadButton);