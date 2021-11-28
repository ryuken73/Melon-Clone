import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useSearchAllArtists from 'hooks/useSearchAllArtists';
import createArtist from 'lib/artistClass';
import CommonPageHeader from 'Components/Common/CommonPageHeader';
import ArtistListInSearchAll from 'Components/Artist/ArtistListInSearchAll';
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

function SearchResultAllArtists(props) {
    const {history, match, location } = props;
    const query = queryString.parse(location.search)
    const {keyword, exactSearch, artistName, songName} = query;
    const result = useSearchAllArtists({keyword, exactSearch, artistName, songName});
    const artists = React.useMemo(() => createArtist(result.data),[result.data]);
    const searchCount = result.isSuccess ? result.data.total : '...';
    const showAllResults = React.useCallback(() => {}, []);
    console.log('&&: in search all song:', result.data, artists)
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
                            text={`아티스트(${searchCount}) >`}>
                        </TextBox>
                    </SubContainer>
                </CommonPageHeader>
            )}
            <ArtistListInSearchAll artists={artists}></ArtistListInSearchAll>
        </Container>
    )
}

export default React.memo(withRouter(SearchResultAllArtists));