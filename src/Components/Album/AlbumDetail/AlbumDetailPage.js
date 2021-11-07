import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import AlbumDetailHeader from './AlbumDetailHeader';
import AlbumDetailTab from './AlbumDetailTab';
import AlbumDetailList from './AlbumDetailList';
import AlbumDetailInfo from './AlbumDetailInfo';
import {withRouter, Switch, Route} from 'react-router-dom';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-left: 15px;
    /* margin-right: 15px; */
`

const AlbumDetailPage = props => {
    const {history, location, match} = props;
    const {receipt_no} = match.params
     
    return (
        <Container>
            <AlbumDetailHeader receipt_no={receipt_no} ></AlbumDetailHeader>
            <AlbumDetailTab history={history} location={location} match={match}></AlbumDetailTab>
            <Switch>
                <Route path="/album/:receipt_no/songList" render={(renderProps) => <AlbumDetailList {...renderProps}></AlbumDetailList> }></Route>
                <Route path="/album/:receipt_no/albumInfo" render={(renderProps) => <AlbumDetailInfo {...renderProps}></AlbumDetailInfo> }></Route>
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(AlbumDetailPage))