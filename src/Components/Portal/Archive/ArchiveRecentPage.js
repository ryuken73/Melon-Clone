import React from 'react';
import Box from '@mui/material/Box'
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import {withRouter} from 'react-router-dom';
import TextBox from 'Components/Common/TextBox'; 
import useQueryArchives from 'hooks/useQueryArchives'
import useQueryProgramList from 'hooks/useQueryProgramList'
import createArchive from 'lib/archiveClass';
import createProgramList from 'lib/programInfoClass';
import ArchiveList from 'Components/Portal/Archive/ArchiveList';
import {getString} from 'lib/util';

const getDateString = (dayBefore) => {
    const targetDate = new Date(new Date().getTime() + dayBefore*24*60*60*1000);
    return getString(targetDate, {sep:''}).substring(0,8);
}

const groupBy = (key, archives, programs) => {
    return archives.reduce((acc, archive) => {
        const alreadyGroup = acc.find(alreadyArchive => alreadyArchive[key] === archive[key]);
        const eval_imagePath = programs.find(program => program.pgm_cd === archive.pgm_cd)?.eval_imagePath;
        archive.albumImgSrc = eval_imagePath;
        if(alreadyGroup === undefined){
            // first member
            acc.push({
                [key]: archive[key],
                'pgm_nm': archive['pgm_nm'],
                'dj': archive['dj'],
                'last_brd_time': archive['brd_time'],
                'chan_cd': archive['chan_cd'],
                'chan_cd_full': archive['chan_cd_full'],
                'eval_imagePath': eval_imagePath,
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
        history.push('/program/powerFM')
    },[history])

    const queryOptions = {
        page_sizes: 60,
        query: `brd_dd >= ${getDateString(-1)}`,
        orderby: "order by brd_dd desc, brd_time desc",
    }

    const result = useQueryArchives(queryOptions);
    const resultsAM = useQueryProgramList('A');
    const resultsFM = useQueryProgramList('F');
    const programs = [...createProgramList(resultsAM.data), ...createProgramList(resultsFM.data)];
    const archives = React.useMemo(() => createArchive(result[0].data), [result]);
    const groupedArchives = groupBy('pgm_cd', archives, programs).slice(0,20)
    console.log('@@@', result, archives, groupedArchives)
    const {refetch} = result[0];

    const refresh = React.useCallback(()=>{
        refetch()
    },[refetch])

    return (

        <CommonPageHeader>
            <Box display="flex" flexDisplay="row" alignItems="center" mb="5px">
                <TextBox 
                    fontSize="20px" 
                    color="yellow" 
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
