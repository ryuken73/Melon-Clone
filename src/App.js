import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import AlbumListPage from 'Components/Album/AlbumList/AlbumListPage';
import AlbumDetailPage from 'Components/Album/AlbumDetail/AlbumDetailPage';
import ArtistDetailPage from 'Components/Artist/ArtistDetail/ArtistDetailPage';
import ProgramPage from 'Components/Archive/ProgramPage';
import ArchiveList from 'Components/Archive/ArchiveList';
import SearchResultPage from 'Components/SearchResult/SearchResultPage';
import SongView from 'Views/SongView';
import PortalView from 'Components/Portal/PortalPage';
import PlayerSkin from 'Components/AudioPlayer/Skin';
import Player from 'Components/AudioPlayer/Player';
import PlayerFlat from 'Components/AudioPlayer/PlayerFlat';
import PlayList from 'Components/PlayList';
import CenterHeader from './CenterHeader';
import VerticalMenu from './VerticalMenu';
import colors from 'config/colors' ;
import MessageBox from './MessageBox';
import Backdrop from 'Components/Common/BackDrop';
import PlaylistDrawer from 'PlaylistDrawer';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import CONSTANTS from 'config/constants';

const {HEIGHT_OF_FLAT_PLAYER} = CONSTANTS;
const LeftPane = styled(Box)`
  width: 150px;
  flex-grow:0;
  flex-shrink:0;
  background:${colors.player};
  display: ${props => props.hide ? 'none':'block'};
`
const RightPane = styled(Box)`
  /* display: ${props => props.hide ? 'none':'flex'}; */
  display: flex;
  flex-direction: column;
  width: ${props => props.hide ? '0px':'300px'};
  opacity: ${props => props.hide ? '0':'1'};
  transition: all 0.5s;
  transition-delay: ${props => props.hide ? '0s':'0.3s'};
  /* min-width: 300px; */
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
// const PlayerSkinFlat = styled(Box)`
//   position: fixed;
//   right: 10px;
//   bottom: ${HEIGHT_OF_FLAT_PLAYER};
//   /* max-height: 300px; */
//   max-height: 450px;
//   height: ${props => props.show ? `calc(100vh - ${HEIGHT_OF_FLAT_PLAYER} )`: '0px'};
//   opacity: ${props => props.show ? '1':'0'};
//   transition: all 1s;
//   /* width: 100%; */
//   /* background: ${colors.highCenterPane}; */
//   background: transparent;
//   /* z-index: 9999; */
//   display: flex;
//   flex-direction: row;
// `

const Footer = styled(Box)`
  /* display: ${props => props.show ? 'block':'none'}; */
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${props => props.show ? HEIGHT_OF_FLAT_PLAYER:'0px'};
  opacity: ${props => props.show ? '1':'0'};
  transition: all 0.5s;
  transition-delay: ${props => props.show ? '0.3s':'0s'};
`

function App() {
  const playerRef = React.useRef(null);
  // const playerFlatRef = React.useRef(null);
  const {hideLeftPane, hideRightPane} = useMediaQueryEasy();
  // const [openPlaySkinFlat, setOpenPlaySkinFlat] = React.useState(false);
  return (
    <div className='App'>
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
          <Route path="/program/:category" render={(routerProps)=><ProgramPage {...routerProps} />} />
          <Route path='/archive/:pgm_cd/archiveList' render={routerprops => <ArchiveList {...routerprops}></ArchiveList>}></Route>
          <Route render={()=><withRouterNotFoundView />} />
        </Switch>
      </CenterPane>
      <RightPane hide={hideRightPane}>
        <PlayerSkin ref={playerRef}></PlayerSkin>
        <Player ref={playerRef} hide={hideRightPane}></Player>
        <PlayList hide={hideRightPane}></PlayList>
      </RightPane> 
      <MessageBox></MessageBox>
      <Backdrop></Backdrop>
      {/* <PlayerSkinFlat show={showPlaySkinFlat}> */}
        {/* can mirror video, but too much performance degrade */}
        {/* <Box display="flex" bgColor="transparent" alignItems="center" flex="3" height="100%" fontSize="20px">
          <PlayerSkin mode="flat" miniPlayerRef={playerRef} hideRightPane={hideRightPane} ref={playerFlatRef}></PlayerSkin>
        </Box> */}
        {/* <Box ml="auto"> */}
          {/* <PlayList mode="flat" flex="1" hide={!hideRightPane}></PlayList> */}
        {/* </Box> */}
      {/* </PlayerSkinFlat> */}
      <PlaylistDrawer hideRightPane={hideRightPane}>
      </PlaylistDrawer>
      <Footer show={hideRightPane}>
        {/* <PlayerFlat setOpenPlaySkinFlat={setOpenPlaySkinFlat} ref={playerRef}></PlayerFlat> */}
        <PlayerFlat ref={playerRef}></PlayerFlat>
      </Footer>
      {/* {hideRightPane && <Footer> 
        <PlayerFlat ref={playerRef}></PlayerFlat>
      </Footer>
      } */}
    </div>
  );
}

export default React.memo(App);
