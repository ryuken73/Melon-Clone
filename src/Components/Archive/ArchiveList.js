import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import ArchiveListTitle from 'Components/Archive/ArchiveListTitle';
import ArchiveListHeader from 'Components/Archive/ArchiveListHeader';
import ScrollBarVirtual from 'Components/Common/ScrollBarVirtual'; 
import ArchiveListItem from 'Components/Archive/ArchiveListItem';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useInfiniteData from 'hooks/useInfiniteData';
import useQueryProgram from 'hooks/useQueryProgram';
import CONSTANTS from 'config/constants';
import createProgramInfo from 'lib/programInfoClass';
const {ARCHIVE_PAGE_SIZE=50} = CONSTANTS;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
`
const ArchiveList = props => {
    const {match} = props;
    const {pgm_cd} = match.params;
    const params = {
        scn: 'archive',
        query: `(text_idx = '${pgm_cd}' allwordthruindexsyn or strv_idx like '*${pgm_cd}*')`,
        orderby: 'order by brd_dd desc'
    }
    const {data, fetchNextPage, isFetching} = useSearchMusicAllInfinite({
        params, 
        page_num:1, 
        page_sizes:ARCHIVE_PAGE_SIZE
    })
    const [archives=[], total] = useInfiniteData(data, 'archives');
    const {data:programResult} = useQueryProgram(pgm_cd);
    const program = createProgramInfo(programResult);
    console.log(archives, program, total);
    const archivesWithImage = archives.map(archive => {
        archive.albumImgSrc = program.eval_imagePath;
        return archive;
    })
    const chan_cd_full = archives.length > 0 ? archives[0].chan_cd_full:'-';
    const chan_cd = archives.length > 0 ? archives[0].chan_cd:'A';
    return (
        <Container>
            <ArchiveListTitle
                program={program}
                chan_cd={chan_cd}
                chan_cd_full={chan_cd_full}
                total={total}
            >
            </ArchiveListTitle>
            <ArchiveListHeader
                archives={archivesWithImage}
                total={total}
            >
            </ArchiveListHeader>
            <ScrollBarVirtual
                items={archivesWithImage}
                fetchNextPage={fetchNextPage}
                rowHeight={57}
                heightMinus="200px"
                ItemElement={ArchiveListItem}
            ></ScrollBarVirtual>
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(ArchiveList); 