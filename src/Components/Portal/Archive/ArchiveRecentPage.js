import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
                'last_brd_time': archive['brd_time_str'],
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
    const groupedArchives = groupBy('pgm_cd', archives, programs).slice(0,20);
    const {powerFM, loveFM} = groupedArchives.reduce((acct, archive) => {
        archive.chan_cd === 'A' && acct.loveFM.push(archive);
        archive.chan_cd === 'F' && acct.powerFM.push(archive);
        return acct;
    },{powerFM:[], loveFM:[]})
    // console.log('@@@', result,programs, archives, groupedArchives)
    const {refetch} = result[0];

    const refresh = React.useCallback(()=>{
        refetch()
    },[refetch])
    const handleOnClickPowerFM = React.useCallback(() => {
        history.push(`/program/PowerFM`)
    },[history])
    const handleOnClickLoveFM = React.useCallback(() => {
        history.push(`/program/loveFM`)
    },[history])

    return (
        <Box mr="5px">
        <CommonPageHeader>
            {/* <Box display="flex" flexDisplay="row" alignItems="center" mb="5px">
                <TextBox 
                    clickable
                    fontSize="20px" 
                    color="yellow" 
                    opacity="0.7" 
                    opacityOnHover="0.9" 
                    text="최신 아카이브 >"
                    onClick={handleOnClick}>
                </TextBox>
                <TextBox
                    clickable
                    fontSize="12px"
                    color="grey"
                    opacity="0.7"
                    opacityOnHover="0.9" 
                    text="새로고침" 
                    ml="20px"
                    onClick={refresh}
                >
                </TextBox>
            </Box> */}
            <Box display="flex" flexDirection="row" width="100%">
                <Box flex="1" border="none 2px grey" borderRadius="25px" mr="10px">
                    <Box display="flex" flexDisplay="row" alignItems="center" mb="5px">
                        <TextBox 
                            clickable
                            fontSize="20px" 
                            color="yellow" 
                            opacity="0.7" 
                            opacityOnHover="0.9" 
                            text="최신 아카이브 >"
                            onClick={handleOnClick}>
                        </TextBox>
                        <TextBox
                            clickable
                            fontSize="12px"
                            color="grey"
                            opacity="0.7"
                            opacityOnHover="0.9" 
                            text="새로고침" 
                            ml="20px"
                            onClick={refresh}
                        >
                        </TextBox>
                        <Box ml="auto">
                            <TextBox 
                                clickable
                                fontSize="16px" 
                                color={'lightskyblue'}
                                text={`[파워FM 106.7]`}
                                mr="20px"
                                ml="auto"
                                onClick={handleOnClickPowerFM}
                            >
                            </TextBox>
                        </Box>
                    </Box>
                    <ArchiveList groupedArchives={powerFM}></ArchiveList>
                </Box>
                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                <Box flex="1" border="none 2px grey" borderRadius="25px">
                    <Box display="flex" flexDisplay="row" alignItems="center" mb="5px" height="30px">
                        <Box ml="auto">
                            <TextBox 
                                clickable
                                fontSize="16px" 
                                color={'burlywood'}
                                text={`[러브FM 103.5]`}
                                mr="20px"
                                ml="3px"
                                onClick={handleOnClickLoveFM}
                            >
                            </TextBox>
                        </Box>
                    </Box>
                    <ArchiveList groupedArchives={loveFM}></ArchiveList>
                </Box>
            </Box>
        </CommonPageHeader>
        </Box>
    )
}

export default React.memo(withRouter(ArchiveRecentPage));
