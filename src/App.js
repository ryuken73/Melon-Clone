import './App.css';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import {Switch, Route, withRouter} from 'react-router-dom';
import AlbumView from './Views/AlbumView';
import SongView from './Views/SongView';
import ArtistView from './Views/ArtistView';
import PortalView from './Views/PortalView';
import NotFoundView from './Views/NotFoundView';
import AudioPlayer from './Components/AudioPlayer';
import PlayList from './Components/PlayList';
import CenterHeader from './CenterHeader';
import colors from './config/colors';

const LeftPane = styled(Box)`
  width: 150px;
  flex-grow:0;
  background:black;
`
const RightPane = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
  background:black;
  flex-grow: 0;
`
const CenterPane = styled(Box)`
  flex-grow:1;
  background: ${colors.centerPane}
`
 
function App() {
  return (
    <div className="App">
      <LeftPane>Left</LeftPane>
      <CenterPane>
        <CenterHeader></CenterHeader>
        <Switch>
          <Route exact path="/" component={PortalView} />
          <Route path="/album/:id?" component={AlbumView} />
          <Route path="/song/:id?" component={SongView} />
          <Route path="/artist/:id?" component={ArtistView} />
          <Route component={NotFoundView} />
        </Switch>
      </CenterPane>
      <RightPane>
        <AudioPlayer></AudioPlayer>
        <PlayList></PlayList>
      </RightPane>
    </div>
  );
}

export default App;
