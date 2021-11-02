import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../Components/Album/albumSlice';
import {getString} from '../lib/util';

const genre = {
  'kpop': 4,
  'pop': 58,
  'classic': 144,
  'etc': 0
}
const FETCH_COUNT = 15;
const getDateTimeString = () => {
  const now = new Date();
  return getString(now, {sep:''}).substring(0,8);
}

function useAlbumList(pathname, fetchRequired, replaceRequired) {
  const albums = useSelector((state) => state.album.fetched[pathname]);
  const dispatch = useDispatch();
  const genreNum = genre[pathname];
  const additionalQuery = pathname === 'all' ? '' : `and top_genre=${genreNum}`;

  React.useEffect(()=>{
    // const additionalQuery = pathname === 'all' ? '' : `and top_genre=${genre[pathname]}`;
    const options = {
      pathname, 
      query: {
        'query':`status='Y' and open_dt <= '${getDateTimeString()}' ${additionalQuery}`
      }
    };
    console.log('fetch in useAlbumList:', pathname, additionalQuery, fetchRequired, replaceRequired);
    if(fetchRequired){
      dispatch(fetchAlbums({...options, replace: replaceRequired}));
    }
  },[pathname, additionalQuery, fetchRequired, replaceRequired,  dispatch])

  const getMoreItem = React.useCallback(()=>{
    console.log('getMoreItem.....')
    // const additionalQuery = pathname === 'all' ? '' : `and top_genre=${genre[pathname]}`;
    const options = {
      pathname, 
      query: {'query':`status='Y' and open_dt <= '${getDateTimeString()}' ${additionalQuery}`}
    };
    dispatch(fetchAlbums({...options, replace: false}));
  },[pathname, additionalQuery, dispatch])

  return [albums, getMoreItem]
}

export default useAlbumList;