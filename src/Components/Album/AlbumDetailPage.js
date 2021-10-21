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
    margin-right: 15px;
`

const AlbumDetailPage = props => {
    const {match} = props;
    const {history, location} = props;
    return (
        <Container>
            <AlbumDetailHeader></AlbumDetailHeader>
            <AlbumDetailTab history={history} location={location}></AlbumDetailTab>
            <Switch>
                <Route path="/album/:id/songList" render={(renderProps) => <AlbumDetailList {...renderProps}></AlbumDetailList> }></Route>
                <Route path="/album/:id/albumInfo" render={(renderProps) => <AlbumDetailInfo {...renderProps}></AlbumDetailInfo> }></Route>
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(AlbumDetailPage))