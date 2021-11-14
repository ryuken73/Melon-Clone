import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryArtist = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useArtistId = artist_name => {
  const [url, setUrl] = React.useState('');
  const [fetchOptions, setFetchOptions] = React.useState({});
  React.useEffect(() => {
    if(artist_name){
      const {url, fetchOptions} = apiMap.doListArtist(artist_name);
      setUrl(url);
      setFetchOptions(fetchOptions);
    }
  }, [artist_name])
  const result = useQuery(['doListArtist', url, fetchOptions], queryArtist, {
    enabled: !!artist_name && !!url
  });    
  console.log('^^ result:',result)
  let artist_id;
  if(result.data !== undefined && result.data.list !== undefined){
    const firstMatch = result.data.list.shift();
    if(firstMatch) {
      artist_id = firstMatch.id;
    } else {
      artist_id = null;
    }
  } else {
    artist_id = null;
  }
  return  artist_id;
} 

export default useArtistId;