import * as React from 'react';
import createAlbum from 'lib/albumClass';
import createSong from 'lib/songClass';
import createArchive from 'lib/archiveClass'
import createPodcasts from 'lib/podcastClass';
import useMessageBox from 'hooks/useMessageBox';
const createFuntions = {
  'albums': createAlbum,
  'songs': createSong,
  'archives': createArchive,
  'podcasts': createPodcasts
}

function useInfiniteData(data, category) {
  const {showMessageBox} = useMessageBox();
  const pages = React.useMemo(() => data ? data.pages:[], [data]);
  const total = React.useMemo(() => data ? data.pages[0].total:'', [data]);
  const merged = React.useMemo(() => {
      const allData = pages.reduce((acc, apiResult) => {
          console.log('######', acc, apiResult.ERROR_MSG) 
          apiResult.ERROR_MSG && showMessageBox(apiResult.ERROR_MSG, 1000, 'error')
          const albums = apiResult.fdata || [];
          return {...apiResult, fdata:[...acc.fdata, ...albums]}
      },{fdata:[]})
      return createFuntions[category](allData)
  },[pages, category]);
  return [merged, total];
}
 
export default useInfiniteData;