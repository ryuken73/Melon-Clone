import * as React from 'react';
import {useQuery} from 'react-query';

const querySuggests = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, uriEncoded ] = queryKey;
  if(uriEncoded.length < 2){
    return Promise.resolve({result:null, count:0})
  }
  const response = await fetch(`http://10.11.31.51:3010/searchSong/withWorkers/${uriEncoded}?userId=null&supportThreeWords=true&count=100`);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useQuerySuggest = patternUriEncoded => {
    const result = useQuery(['autocomplete', patternUriEncoded], querySuggests, {
        enabled: !!patternUriEncoded
    });    
    return result;
} 

export default useQuerySuggest;