import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArtistDetailHeader from './ArtistDetailHeader';
import ArtistDetailTab from './ArtistDetailTab';
import ArtistDetailSongList from './ArtistDetailSongList';
import ArtistDetailAlbumList from './ArtistDetailAlbumList';
import {withRouter, Switch, Route} from 'react-router-dom';
import queryString from 'query-string';


const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "auto"};
    margin-left: 15px;
    /* margin-right: 15px; */
`
const ArtistDetailPage = props => {
    const {location} = props;
    const query = queryString.parse(location.search)
    const {sch_id} = query;
    console.log('re-render ArtistDetailPage')
    React.useEffect(() => {
        return () => {
            console.log('ArtistDetailPage umounted!')
        }
    },[])
    
    return (
        <Container>
            <ArtistDetailHeader sch_id={sch_id} ></ArtistDetailHeader>
            <ArtistDetailTab></ArtistDetailTab>
            <Switch>
                <Route path="/artist/:artist_name/songList" render={(renderProps) => <ArtistDetailSongList {...renderProps}></ArtistDetailSongList> }></Route>
                <Route path="/artist/:artist_name/albumList" render={(renderProps) => <ArtistDetailAlbumList {...renderProps}></ArtistDetailAlbumList> }></Route>
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailPage))