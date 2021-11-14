import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const querySuggests = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, patternUriEncoded ] = queryKey;
  if(patternUriEncoded.length < 2){
    return Promise.resolve({result:null, count:0})
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useQuerySuggest = patternUriEncoded => {
    const {url, fetchOptions} = apiMap.querySuggest(patternUriEncoded);
    const result = useQuery(['autocomplete', url, fetchOptions, patternUriEncoded], querySuggests, {
        enabled: !!patternUriEncoded
    });    
    return result;
} 

export default useQuerySuggest;