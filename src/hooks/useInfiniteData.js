import * as React from 'react';
import createAlbum from 'lib/albumClass';
import createSong from 'lib/songClass';
import createArchive from 'lib/archiveClass'
import createPodcasts from 'lib/podcastClass';
const createFuntions = {
  'albums': createAlbum,
  'songs': createSong,
  'archives': createArchive,
  'podcasts': createPodcasts
}

function useInfiniteData(data, category) {
  const pages = React.useMemo(() => data ? data.pages:[], [data]);
  const total = React.useMemo(() => data ? data.pages[0].total:'', [data]);
  const merged = React.useMemo(() => {
      const allData = pages.reduce((apiResult, acc) => {
          const albums = apiResult.fdata;
          return {...apiResult, fdata:[...albums, ...acc.fdata]}
      },{fdata:[]})
      return createFuntions[category](allData)
  },[pages, category]);
  return [merged, total];
}
 
export default useInfiniteData;