import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import styled, {keyframes, css} from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import Login from 'Login';
import LoginLoading from 'LoginLoading';
import AlbumListPage from 'Components/Album/AlbumList/AlbumListPage';
import AlbumDetailPage from 'Components/Album/AlbumDetail/AlbumDetailPage';
import ArtistDetailPage from 'Components/Artist/ArtistDetail/ArtistDetailPage';
import ProgramPage from 'Components/Archive/ProgramPage';
import ArchiveList from 'Components/Archive/ArchiveList';
import PodcastProgramPage from 'Components/Podcast/PodcastProgramPage'
import PodcastList from 'Components/Podcast/PodcastList'
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
import useMediaQueryApp from 'hooks/useMediaQueryApp';
import useMediaQueryMenu from 'hooks/useMediaQueryMenu';
import useAppState from 'hooks/useAppState';
import useSessionStorage from 'hooks/useSessionStorage';
// import usePlaylistInStorage from 'hooks/usePlaylistInStorage';
import CONSTANTS from 'config/constants';

const {HEIGHT_OF_FLAT_PLAYER} = CONSTANTS;
const LeftPane = styled(Box)`
  width: 150px;
  flex-grow:0;
  flex-shrink:0;
  background:${colors.player};
  display: ${props => props.hide ? 'none':'block'};
`
const ShowRightPane = keyframes`
  from {
    width: 0px;
    opacity: 0;
  }
  to {
    width: 300px;
    opacity: 1;
  }
`
const HideRightPane = keyframes`
  from {
    width: 300px;
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`

const showStyle = css`
  animation-name: ${ShowRightPane};
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: both;
`
const hideStyle = css`
  animation-name: ${HideRightPane};
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: both;
`

const RightPane = styled(Box)`
  /* display: ${props => props.hide ? 'none':'flex'}; */
  display: flex;
  flex-direction: column;
  background:black;
  flex-grow: 0;
  flex-shrink: 0;
  ${props => (!props.hide && showStyle)};
  ${props => (props.hide && hideStyle)};
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
  const {loginId} = useAppState();
  const playerRef = React.useRef(null);
  // const playerFlatRef = React.useRef(null);
  const {hideRightPane} = useMediaQueryApp();
  const {hideLeftPane} = useMediaQueryMenu();
  console.log('&& re-render App')
  React.useEffect(() => console.log('re-render change hideRightPane'), [hideRightPane])
  // load saved playlist and sync playlist back afterward
  // usePlaylistInStorage();
  // const [openPlaySkinFlat, setOpenPlaySkinFlat] = React.useState(false);
  return (
    <div>
      {loginId === null && (
        <div className='App'>
          <LoginLoading></LoginLoading>
          <MessageBox></MessageBox>
        </div>
      )} 
      {loginId !== null && (
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
              <Route path="/podcastProgram/:category" render={(routerProps)=><PodcastProgramPage {...routerProps} />} />
              <Route path="/podcast/:pgm_cd/podcastList" render={(routerProps)=><PodcastList {...routerProps} />} />
              <Route render={()=><withRouterNotFoundView />} />
            </Switch>
          </CenterPane>
          <RightPane hide={hideRightPane}>
            <PlayerSkin ref={playerRef} hide={hideRightPane}></PlayerSkin>
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
            <PlayerFlat hideRightPane={hideRightPane} ref={playerRef}></PlayerFlat>
          </Footer>
          {/* {hideRightPane && <Footer> 
            <PlayerFlat ref={playerRef}></PlayerFlat>
          </Footer>
          } */}
        </div>
      )}
    </div>
  );
}

export default React.memo(App);
