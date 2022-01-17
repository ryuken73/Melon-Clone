import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArchiveListHeader from 'Components/Archive/ArchiveListHeader';
import ScrollBarVirtual from 'Components/Common/ScrollBarVirtual'; 
import TextBox from 'Components/Common/TextBox'; 
import ArchiveListItem from 'Components/Archive/ArchiveListItem';
import useSearchMusicAllInfinite from 'hooks/useSearchMusicAllInfinite';
import useInfiniteData from 'hooks/useInfiniteData';
import queryString from 'query-string';
import { withRouter} from 'react-router-dom';
import CONSTANTS from 'config/constants';
const {ARCHIVE_PAGE_SIZE=50} = CONSTANTS;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    /* margin-top: 30px; */
`
function SearchResultLyrics(props) {
    const {location } = props;
    const query = queryString.parse(location.search)
    const {keyword} = query;
    const params = {
        page_sizes: ARCHIVE_PAGE_SIZE,
        scn: 'archive',
        query: `(text_idx = '${keyword}' allwordthruindexsyn or strv_idx like '*${keyword}*')`,
        orderby: "order by brd_dd desc"
    }
    const {data, fetchNextPage, isFetching} = useSearchMusicAllInfinite({
        params, 
        page_num:1, 
        page_sizes:ARCHIVE_PAGE_SIZE
    })
    const [archives=[], total] = useInfiniteData(data, 'archives');
    return (
        <Container>
            <ArchiveListHeader
                archives={archives}
                total={total}
                isSearchResult={true}
            >
            </ArchiveListHeader>
            <ScrollBarVirtual
                items={archives}
                fetchNextPage={fetchNextPage}
                rowHeight={57}
                heightMinus="220px"
                ItemElement={ArchiveListItem}
                itemProps={{
                    isSearchResult: true
                }}
            ></ScrollBarVirtual>
            {isFetching && (
                <Box m="10px">
                    <TextBox fontSize="14px" text={`Getting More Data..`}></TextBox>
                </Box>
            )}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultLyrics));