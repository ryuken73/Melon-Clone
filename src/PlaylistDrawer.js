import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PlayList from 'Components/PlayList';
import useAppState from 'hooks/useAppState';
import CONSTANTS from 'config/constants';
const {HEIGHT_OF_FLAT_PLAYER} = CONSTANTS;

const PlayerSkinFlat = styled(Box)`
  position: fixed;
  right: 10px;
  bottom: ${HEIGHT_OF_FLAT_PLAYER};
  max-height: 450px;
  height: ${props => props.show ? `calc(100vh - ${HEIGHT_OF_FLAT_PLAYER} )`: '0px'};
  opacity: ${props => props.show ? '1':'0'};
  transition: all 1s;
  background: transparent;
  display: flex;
  flex-direction: row;
`

const PlaylistDrawer = props => {
    const {hideRightPane} = props;
    const {openPlaySkinFlat} = useAppState();
    const showPlaySkinFlat = openPlaySkinFlat && hideRightPane;
    // console.log(openPlaySkinFlat, hideRightPane, showPlaySkinFlat)
    return (
        <PlayerSkinFlat show={showPlaySkinFlat}>
          <PlayList mode="flat" hide={!hideRightPane}></PlayList>
        </PlayerSkinFlat>
    )
}

export default React.memo(PlaylistDrawer);