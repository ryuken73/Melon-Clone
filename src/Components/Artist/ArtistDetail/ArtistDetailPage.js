import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArtistDetailHeader from './ArtistDetailHeader';
import ArtistDetailTab from './ArtistDetailTab';
import ArtistDetailList from './ArtistDetailList';
import ArtistDetailInfo from './ArtistDetailInfo';
import AlbumList from 'Components/Album/AlbumList/AlbumList';
import {withRouter, Switch, Route} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-left: 15px;
    /* margin-right: 15px; */
`

const ArtistDetailPage = props => {
    const {history, location, match} = props;
    const {receipt_no} = match.params
     
    return (
        <Container>
            <ArtistDetailHeader receipt_no={receipt_no} ></ArtistDetailHeader>
            <ArtistDetailTab history={history} location={location} match={match}></ArtistDetailTab>
            <Switch>
                <Route path="/artist/:receipt_no/songList" render={(renderProps) => <ArtistDetailList {...renderProps}></ArtistDetailList> }></Route>
                {/* <Route path="/artist/:receipt_no/albumList" render={(renderProps) => <ArtistDetailInfo {...renderProps}></ArtistDetailInfo> }></Route> */}
                <Route path="/artist/:receipt_no/:pathname" render={(renderProps) => <AlbumList {...renderProps}></AlbumList> }></Route>
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailPage))