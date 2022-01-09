import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox';
import ScrollBarVirtual from 'Components/Common/ScrollBarVirtual'; 
import ArchiveListItem from 'Components/Archive/ArchiveListItem';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useInfiniteData from 'hooks/useInfiniteData';
import CONSTANTS from 'config/constants';
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
    const [archives, total] = useInfiniteData(data, 'archives');
    console.log(archives, total);
    return (
        <Container>
            <ScrollBarVirtual
                items={archives}
                fetchNextPage={fetchNextPage}
                rowHeight={57}
                heightMinus="220px"
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