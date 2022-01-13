import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

const getDateTimeString = () => {
    const now = new Date();
    return getString(now, {sep:''}).substring(0,12);
}

const queryAll = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  console.log('fetch called:', _key, queryKey)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};


const useQueryAlbums = (page_num=1, page_sizes=15) => {
  const currentTimeString = React.useMemo(() => getDateTimeString(), []);
  const params = {
    page_num,
    page_sizes,
    scn: 'album', 
    query: `status='Y' and open_time <= '${currentTimeString}'`,
    orderby: "order by open_dt desc",
    bool: true
  }

  const {url, fetchOptions} = apiMap.searchMusicAll({...params});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, params, 'album'], queryAll);
  return searchResult;
} 

export default useQueryAlbums;