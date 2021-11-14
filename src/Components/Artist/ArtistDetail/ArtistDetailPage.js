import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ArtistDetailHeader from './ArtistDetailHeader';
import ArtistDetailTab from './ArtistDetailTab';
import ArtistDetailList from './ArtistDetailList';
import ArtistDetailInfo from './ArtistDetailInfo';
import AlbumList from 'Components/Album/AlbumList/AlbumList';
import {withRouter, Switch, Route} from 'react-router-dom';
import useArtistId from 'hooks/useArtistId';
import useArtistInfo from 'hooks/useArtistInfo';


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
    const {artist_name} = match.params
    const [artist_id, setArtistId] = React.useState(null);
    const artistId = useArtistId(artist_name);
    React.useEffect(() => {
        console.log('^^ uhh artistId changed')
        setArtistId(artistId)
    },[artistId])
    console.log('^^ artistDetailPage id:', artistId);
    const artistInfo = useArtistInfo(artist_id);
    console.log('^^ artistDetailPage info:', artistInfo);

    return (
        <Container>
            {/* <ArtistDetailHeader artistInfo={artistInfo} ></ArtistDetailHeader> */}
            {/* <ArtistDetailTab history={history} location={location} match={match}></ArtistDetailTab> */}
            <Switch>
                <Route path="/artist/:artist_name/songList" render={(renderProps) => <ArtistDetailList {...renderProps}></ArtistDetailList> }></Route>
                {/* <Route path="/artist/:receipt_no/albumList" render={(renderProps) => <ArtistDetailInfo {...renderProps}></ArtistDetailInfo> }></Route> */}
                {/* <Route path="/artist/:artist_name/:pathname" render={(renderProps) => <AlbumList {...renderProps}></AlbumList> }></Route> */}
            </Switch>
        </Container>
    )
}

export default React.memo(withRouter(ArtistDetailPage))