import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryArtist = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useArtistId = artist_name => {
  const {url, fetchOptions} = apiMap.doListArtist(artist_name);
  const result = useQuery(['doListArtist', url, fetchOptions, artist_name], queryArtist, {
    enabled: !!artist_name && !!url
  });    
  return result;
}
export default useArtistId;