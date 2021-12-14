import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryArtist = async ({queryKey}) => {
  // console.log('^^ fetch called:',queryKey)
  const [_key, url, options ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useArtistDoGet = sch_id => {
  const {url, fetchOptions} = apiMap.doGetArtistInfo(sch_id);
  const searchResult = useQuery(['doGetArtistInfo', url, fetchOptions, sch_id], queryArtist, {
    enabled: !!sch_id
  });  
  return searchResult;
} 

export default useArtistDoGet;