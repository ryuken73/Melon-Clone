import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import AlbumListPage from './Components/Album/AlbumListPage';
import AlbumDetailPage from './Components/Album/AlbumDetailPage';
import SongView from './Views/SongView';
import ArtistView from './Views/ArtistView';
import PortalView from './Components/Portal/PortalPage';
import NotFoundView from './Views/NotFoundView';
import AudioPlayer from './Components/AudioPlayer';
import PlayList from './Components/PlayList';
import CenterHeader from './CenterHeader';
import VerticalMenu from './VerticalMenu';
import colors from './config/colors';
 
const LeftPane = styled(Box)`
  width: 150px;
  flex-grow:0;
  flex-shrink:0;
  background:black;
`
const RightPane = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
  background:black;
  flex-grow: 0;
  flex-shrink: 0;
`
const CenterPane = styled(Box)`
  flex-grow:1;
  min-width:800px;
  background: ${colors.centerPane}
`

function App() {
  return (
    <div className="App">
      <LeftPane>
        <VerticalMenu></VerticalMenu>
      </LeftPane>
      <CenterPane>
        <CenterHeader></CenterHeader>
        <Switch>
          <Route exact path="/" render={()=><PortalView />} />
          <Route path="/albumList" render={(routerProps)=><AlbumListPage {...routerProps} />} />
          <Route path="/album/:id/:category" render={(routerProps)=><AlbumDetailPage {...routerProps} />} />
          <Route path="/song/:id?" render={(routerProps)=><SongView {...routerProps} />} />
          <Route path="/artist/:id?" render={(routerProps)=><ArtistView {...routerProps} />} />
          <Route render={()=><withRouterNotFoundView />} />
        </Switch>
      </CenterPane>
      <RightPane>
        <AudioPlayer></AudioPlayer>
        <PlayList></PlayList>
      </RightPane> 
    </div>
  );
}

export default React.memo(App);
