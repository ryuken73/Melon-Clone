import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import SearchResultBar from './SearchResultBar';
import SearchResultTabPage from './SearchResultTabPage';
import SearchResultAll from './SearchResultAll';
import SearchResultSongs from './SearchResultSongs';
import SearchResultAlbums from './SearchResultAlbums';
import SearchResultArtists from './SearchResultArtists';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`
const SubContainer = styled(Box)`
    margin-top: 10px;
`

function SearchResultPage(props) {
    const {match} = props;
    const {category} = match.params;
    const ResultSummary = props => {
        const {category} = props;
        if(category === 'all'){
            return <SearchResultAll></SearchResultAll>
        }
        if(category === 'songs'){
            return <SearchResultSongs></SearchResultSongs>
        }
        if(category === 'albums'){
            return <SearchResultAlbums></SearchResultAlbums>
        }
        if(category === 'artists'){
            return <SearchResultArtists></SearchResultArtists>
        }
    }
    return (
        <Container>
            <SearchResultBar></SearchResultBar>
                <SubContainer>
                    <Switch>
                        <Route path='/searchResult/:category/:keyword' render={routerProps => <ResultSummary {...routerProps} category={category}></ResultSummary>}></Route>
                    </Switch>
                </SubContainer>
            {/* <SearchResultSongs></SearchResultSongs>
            <SearchResultAlbums></SearchResultAlbums>
            <SearchResultArtists></SearchResultArtists> */}
        </Container>
    )
}

export default React.memo(withRouter(SearchResultPage));