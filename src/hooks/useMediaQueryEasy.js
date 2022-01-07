import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {
  WIDTH_TO_HIDE_SIDE_PANEL, 
  WIDTH_TO_SHOW_SHORT_UPDATE_TEXT,
  WIDTH_TO_SHOW_3COL_ARCHIVE,
  WIDTH_TO_SHOW_2COL_ARCHIVE,
  HEIGHT_OF_FLAT_PLAYER
} = CONSTANTS;

function useMediaQueryEasy() {
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const showShortArchiveList = useMediaQuery(`(max-width:${WIDTH_TO_SHOW_SHORT_UPDATE_TEXT})`);
  const show3ColArchiveList = useMediaQuery(`(max-width:${WIDTH_TO_SHOW_3COL_ARCHIVE}) and (min-width:${WIDTH_TO_SHOW_2COL_ARCHIVE})`);
  const show2ColArchiveList = useMediaQuery(`(max-width:${WIDTH_TO_SHOW_2COL_ARCHIVE})`);
  const fullViewHeightMediaQuery = hideLeftPane ? `100vh - ${HEIGHT_OF_FLAT_PLAYER} - 20px` : '100vh';
  const bottomByMediaQuery = hideLeftPane ? '120px' : '20px';

  return {
    hideLeftPane,
    hideRightPane,
    showShortArchiveList,
    show2ColArchiveList,
    show3ColArchiveList,
    fullViewHeightMediaQuery,
    bottomByMediaQuery
  }
}

export default useMediaQueryEasy;