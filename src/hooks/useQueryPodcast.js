import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

const queryAll = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  console.log('fetch called:', _key, queryKey)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};


const useQueryPodcast = options => {
  const params = {
    page_num: 1,
    page_sizes: 30,
    scn: 'podcast', 
    orderby: "order by brad_day desc",
    bool: true,
    ...options
  }

  const {url, fetchOptions} = apiMap.searchMusicAll({...params});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, params, 'podcast'], queryAll);
  return searchResult;
} 

export default useQueryPodcast;