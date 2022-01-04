import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {
  WIDTH_TO_HIDE_SIDE_PANEL, 
  WIDTH_TO_SHOW_MINI_ARCHIVE,
  HEIGHT_OF_FLAT_PLAYER
} = CONSTANTS;

function useMediaQueryEasy() {
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const showMiniArchiveList = useMediaQuery(`(max-width:${WIDTH_TO_SHOW_MINI_ARCHIVE})`);
  const fullViewHeightMediaQuery = hideLeftPane ? `100vh - ${HEIGHT_OF_FLAT_PLAYER} - 20px` : '100vh';
  const bottomByMediaQuery = hideLeftPane ? '120px' : '20px';

  return {
    hideLeftPane,
    hideRightPane,
    showMiniArchiveList,
    fullViewHeightMediaQuery,
    bottomByMediaQuery
  }
}

export default useMediaQueryEasy;