import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllLyrics from 'hooks/useSearchAllLyrics';
import createLyrics from 'lib/lyricsClass';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import LyricsListInSearchAll from 'Components/Lyrics/LyricsListInSearchAll';
import TextBox from 'Components/Common/TextBox';
import queryString from 'query-string';
import {Switch, Route, withRouter} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: transparent;
    margin-top: 30px;
`
const SubContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 350px;
    margin-bottom: 10px;
`

function SearchResultAllLyrics(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    console.log('^^^^:', query)
    const result = useSearchAllLyrics({keyword, exactSearch, artistName, songName});
    const lyrices = React.useMemo(() => createLyrics(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const showAllResults = React.useCallback(() => {}, []);
    console.log('&&: in search all lyrics:', result.data, lyrices)
    return (
        <Container>
            {result.isSuccess && (
                <CommonPageHeader>
                    <SubContainer>
                        <TextBox 
                            fontSize="20px" 
                            color="white" 
                            opacity={searchCount === 0 ? "0.2":"0.7"}
                            opacityOnHover={searchCount === 0 ? "0.2":"0.7"}
                            onClick={showAllResults}
                            text={`가사(${searchCount}) >`}>
                        </TextBox>
                    </SubContainer>
                </CommonPageHeader>
            )}
            <LyricsListInSearchAll lyrices={lyrices}></LyricsListInSearchAll>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllLyrics));