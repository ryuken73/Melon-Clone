import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArtistDetailHeader from './ArtistDetailHeader';
import ArtistDetailTab from './ArtistDetailTab';
// import ArtistDetailList from './ArtistDetailList';
import ArtistDetailSongList from './ArtistDetailSongList';
import AlbumList from 'Components/Album/AlbumList/AlbumList';
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
const queryArtist = async ({queryKey}) => {
  console.log('^^ fetch called:',queryKey)
  const [_key, url, options, artist_id ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const ArtistDetailPage = props => {
    const {history, location, match} = props;
    const {category} = match.params
    const query = queryString.parse(location.search)
    const {sch_id} = query;
    return (
        <Container>
            <ArtistDetailHeader sch_id={sch_id} ></ArtistDetailHeader>
            <ArtistDetailTab></ArtistDetailTab>
            <Switch>
                <Route path="/artist/:artist_name/songList" render={(renderProps) => <ArtistDetailSongList {...renderProps}></ArtistDetailSongList> }></Route>
                {/* <Route path="/artist/:artist_name/albumList" render={(renderProps) => <ArtistDetailList {...renderProps}></ArtistDetailList> }></Route> */}
                {/* <Route path="/artist/:artist_name/detailInfo" render={(renderProps) => <ArtistDetailList {...renderProps}></ArtistDetailList> }></Route> */}
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailPage))