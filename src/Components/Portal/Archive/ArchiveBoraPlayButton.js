import React from 'react';
import SmartDisplay from '@mui/icons-material/SmartDisplay'
import styled from 'styled-components'
import useQueryArchiveDetail from 'hooks/useQueryArchiveDetail';

const SmallSmartDisplay = styled(SmartDisplay)`
    font-size: 18px !important;
    color: darkslategrey;
    cursor: pointer;
`

const ArchiveBoraPlayButton = props => {
    const {media_id} = props;
    const [queryDetail, resultFinal] = useQueryArchiveDetail(media_id);
    console.log('^^^^', resultFinal)
    const addVideoNPlay = React.useCallback(() => {
        queryDetail.refetch()
        .then(result => {
            console.log(result);
        })
    },[queryDetail])
    return (
        <SmallSmartDisplay
            onClick={addVideoNPlay}
        >
        </SmallSmartDisplay>
    );
};

export default React.memo(ArchiveBoraPlayButton);