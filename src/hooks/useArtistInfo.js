import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryArtist = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, artist_id ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  console.log('^^ [INFO]response.json:', artist_id, response.json())
  return response.json()
};

const useArtistInfo = artist_id => {
  const [url, setUrl] = React.useState('');
  const [fetchOptions, setFetchOptions] = React.useState({});
  React.useEffect(() => {
      console.log('^^ receive new artist_id:', artist_id)
    if(artist_id){
      console.log('^^ receive new artist_id:', artist_id)
      const {url, fetchOptions} = apiMap.doGetArtistInfo(artist_id);
      setUrl(url);
      setFetchOptions(fetchOptions);
    }
  },[artist_id])
  const queryResult = useQuery(['doGetArtistInfo', url, fetchOptions], queryArtist, {
    enabled: !!(artist_id) && !!url
  })
  console.log('^^ queryResult:', queryResult);
  return queryResult.data;
} 

export default useArtistInfo;