import useMediaQuery from '@mui/material/useMediaQuery';
import CONSTANTS from 'config/constants';
const {WIDTH_TO_HIDE_SIDE_PANEL} = CONSTANTS;

function useMediaQueryEasy() {
  const hideLeftPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
  const showMiniArchiveList = useMediaQuery('(max-width:1440px)');
  
  return {
    hideLeftPane,
    hideRightPane,
    showMiniArchiveList
  }
}

export default useMediaQueryEasy;