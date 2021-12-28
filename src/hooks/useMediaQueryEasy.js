import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {WIDTH_TO_HIDE_SIDE_PANEL, HEIGHT_OF_FLAT_PLAYER} = CONSTANTS;

function useMediaQueryEasy() {
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const showMiniArchiveList = useMediaQuery('(max-width:1440px)');
  const fullViewHeightMediaQuery = hideLeftPane ? `100vh - ${HEIGHT_OF_FLAT_PLAYER} - 20px` : '100vh';

  return {
    hideLeftPane,
    hideRightPane,
    showMiniArchiveList,
    fullViewHeightMediaQuery
  }
}

export default useMediaQueryEasy;