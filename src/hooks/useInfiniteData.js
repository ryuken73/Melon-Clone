import * as React from 'react';
import createAlbum from 'lib/albumClass';
import createSong from 'lib/songClass';
import createArchive from 'lib/archiveClass'
const createFuntions = {
  'albums': createAlbum,
  'songs': createSong,
  'archives': createArchive
}

function useInfiniteData(data, category) {
  const pages = React.useMemo(() => data ? data.pages:[], [data]);
  const total = React.useMemo(() => data ? data.pages[0].total:'', [data]);
  const merged = React.useMemo(() => {
      const merged = pages.reduce((apiResult, acc) => {
          const albums = apiResult.fdata;
          return {...apiResult, fdata:[...albums, ...acc.fdata]}
      },{fdata:[]})
      return createFuntions[category](merged)
  },[pages, category]);

  return [merged, total];
}
 
export default useInfiniteData;