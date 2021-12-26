import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import AlbumListPage from 'Components/Album/AlbumList/AlbumListPage';
import AlbumDetailPage from 'Components/Album/AlbumDetail/AlbumDetailPage';
import ArtistDetailPage from 'Components/Artist/ArtistDetail/ArtistDetailPage';
import SearchResultPage from 'Components/SearchResult/SearchResultPage';
import SongView from 'Views/SongView';
import PortalView from 'Components/Portal/PortalPage';
import PlayerSkin from 'Components/AudioPlayer/Skin';
import Player from 'Components/AudioPlayer/Player';
import PlayList from 'Components/PlayList';
import CenterHeader from './CenterHeader';
import VerticalMenu from './VerticalMenu';
import colors from 'config/colors' ;
import MessageBox from './MessageBox';
import Backdrop from 'Components/Common/BackDrop';
import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';

const LeftPane = styled(Box)`
  width: 150px;
  flex-grow:0;
  flex-shrink:0;
  background:${colors.player};
  display: ${props => props.hide ? 'none':'block'};
`
const RightPane = styled(Box)`
  display: ${props => props.hide ? 'none':'flex'};
  flex-direction: column;
  width: 300px;
  min-width: 300px;
  background:black;
  flex-grow: 0;
  flex-shrink: 0;
`
const CenterPane = styled(Box)`
  flex-grow:1;
  min-width:800px;
  background: ${colors.centerPane};
  padding-left: ${props => props.hideLeftPane && '20px'};
  padding-right: ${props => props.hideRightPane && '20px'};
`

const Footer = styled(Box)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: red;
`

function App() {
  const {WIDTH_TO_HIDE_SIDE_PANEL} = CONSTANTS;
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  return (
    <div className="App">
      <LeftPane hide={hideLeftPane}>
        <VerticalMenu></VerticalMenu>
      </LeftPane>
      <CenterPane hideLeftPane={hideLeftPane} hideRightPane={hideRightPane}>
        <CenterHeader></CenterHeader>
        <Switch>
          <Route exact path="/" render={()=><PortalView />} />
          <Route path="/albumList" render={(routerProps)=><AlbumListPage {...routerProps} />} />
          <Route path="/album/:receipt_no" render={(routerProps)=><AlbumDetailPage {...routerProps} />} />
          <Route path="/song/:id" render={(routerProps)=><SongView {...routerProps} />} />
          <Route path="/artist/:artist_name/:category" render={(routerProps)=><ArtistDetailPage {...routerProps} />} />
          <Route path="/searchResult/:category" render={(routerProps)=><SearchResultPage {...routerProps} />} />
          <Route render={()=><withRouterNotFoundView />} />
        </Switch>
      </CenterPane>
      <RightPane hide={hideRightPane}>
        <PlayerSkin></PlayerSkin>
        <Player></Player>
        <PlayList></PlayList>
      </RightPane> 
      <MessageBox></MessageBox>
      <Backdrop></Backdrop>
      {hideRightPane && <Footer>
        <div>111</div>
      </Footer>
      }
    </div>
  );
}

export default React.memo(App);
