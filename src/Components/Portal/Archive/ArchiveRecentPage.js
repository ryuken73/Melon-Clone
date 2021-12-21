import React from 'react';
import Box from '@mui/material/Box'
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox'; 
import useQueryArchives from 'hooks/useQueryArchives'
import createArchive from 'lib/archiveClass';
import ArchiveList from 'Components/Portal/Archive/ArchiveList';

const groupBy = (key, archives) => {
    return archives.reduce((acc, archive) => {
        const alreadyGroup = acc.find(alreadyArchive => alreadyArchive[key] === archive[key]);
        if(alreadyGroup === undefined){
            // first member
            acc.push({
                [key]: archive[key],
                'pgm_nm': archive['pgm_nm'],
                'dj': archive['dj'],
                'last_brd_time': archive['brd_time'],
                'chan_cd_full': archive['chan_cd_full'],
                archiveChildren: [archive]
            })
        } else {
            // member of existing element
            alreadyGroup.archiveChildren.push(archive);
        }
        return [...acc];
    },[]) 
}

const ArchiveRecentPage = props => {
    const {history} = props;
    const handleOnClick = React.useCallback(()=>{
        console.log('### history.location changed', history)
        history.push('/archive')
    },[history.location])

    const result = useQueryArchives(1, 60);
    const archives = React.useMemo(() => createArchive(result.data), [result.data]);
    const groupedArchives = groupBy('pgm_cd', archives).slice(0,20)
    console.log('^^^', archives, groupedArchives)
    const {refetch} = result;

    const refresh = React.useCallback(()=>{
        refetch()
    },[refetch])

    return (

        <CommonPageHeader>
            <Box display="flex" flexDisplay="row" alignItems="center" mb="5px">
                <TextBox 
                    fontSize="20px" 
                    color="white" 
                    opacity="0.7" 
                    opacityOnHover="0.9" 
                    text="최신 아카이브 >"
                    onClick={handleOnClick}>
                </TextBox>
                <TextBox
                    fontSize="12px"
                    color="grey"
                    opacity="0.7"
                    opacityOnHover="0.9" 
                    text="새로고침" 
                    ml="20px"
                    onClick={refresh}
                >
                </TextBox>
            </Box>
            <ArchiveList groupedArchives={groupedArchives}></ArchiveList>
        </CommonPageHeader>
    )
}

export default React.memo(withRouter(ArchiveRecentPage));
