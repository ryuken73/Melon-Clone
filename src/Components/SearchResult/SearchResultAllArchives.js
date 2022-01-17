import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArchiveListItem from 'Components/Archive/ArchiveListItem';
import Divider from 'Components/Common/Divider';
import useQueryArchives from 'hooks/useQueryArchives';
import createArchive from 'lib/archiveClass';
import SongListInSearchAll from 'Components/Song/SongListInSearchAll';
import SearchResultAllHeader from 'Components/SearchResult/SearchResultAllHeader';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';
import { qsToNavigateInSearchResult } from 'lib/util';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: 30px;
`
function SearchResultAllArchives(props) {
    const {history, match, location } = props;
    const {page_sizes=10, page_num=null} = props;
    const query = queryString.parse(location.search)
    const {keyword} = query;
    const queryOptions = {
        page_sizes,
        query: `(text_idx = '${keyword}' allwordthruindexsyn or strv_idx like '*${keyword}*')`,
        orderby: "order by brd_dd desc"
    }
    const result = useQueryArchives(queryOptions);
    const archives = React.useMemo(() => createArchive(result[0].data), [result]);

    const searchCount = result[0].isSuccess ? result[0].data.total : '0';
    const qs = qsToNavigateInSearchResult(query);
    const showAllResults = React.useCallback(() => {
        history.push(`/searchResult/archives?${qs}`, {tabName:'songs', qs})
    }, [history, qs]);
    console.log('&&: in search all archives:', result, archives, searchCount)
    return (
        <Container>
            {result[0].isSuccess && (
                <Box>
                    <SearchResultAllHeader
                        category="archives"
                        searchCount={searchCount}
                        showAllResults={showAllResults}
                    ></SearchResultAllHeader>
                    {archives.map((archive, index) => (
                        <Box>
                            <ArchiveListItem 
                                key={archive.id}
                                item={archive}
                                rownum={index}
                                isSearchResult={true}
                            >
                            </ArchiveListItem>
                            <Divider margin="0px" opacity="0.2" mt="3px"></Divider>
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllArchives));