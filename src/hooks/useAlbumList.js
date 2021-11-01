import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFetchedAlbums, replaceAlbums, fetchAlbums } from '../Components/Album/albumSlice';
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

function useAlbumList(pathname, newFetchRequired) {
  const albums = useSelector((state) => state.album.fetched[pathname]);
  const dispatch = useDispatch();
  const genreNum = genre[pathname];

  React.useEffect(()=>{
    const additionalQuery = pathname === 'all' ? '' : `and top_genre=${genre[pathname]}`;
    const options = {
      pathname, 
      query: {
        'query':`status='Y' and open_dt <= '${getDateTimeString()}' ${additionalQuery}`
      }
    };
    dispatch(fetchAlbums({...options, replace: newFetchRequired}));
  },[pathname])

  const getMoreItem = React.useCallback(()=>{
    console.log('getMoreItem.....')
    const additionalQuery = pathname === 'all' ? '' : `and top_genre=${genre[pathname]}`;
    const options = {
      pathname, 
      query: {'query':`status='Y' and open_dt <= '${getDateTimeString()}' ${additionalQuery}`}
    };
    dispatch(fetchAlbums({...options, replace: false}));
  },[pathname, dispatch])

  return [albums, getMoreItem]
}

export default useAlbumList;