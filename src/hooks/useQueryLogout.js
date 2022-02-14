import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryAll = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  console.log('fetch called:', _key, queryKey)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const authenticated = response.redirected;
  return authenticated;
};

const useQueryLotout = () => {
  const {url, fetchOptions} = apiMap['logoutRtnNo.do']();
  const results = useQuery(['logoutRtnNo.do', url, fetchOptions], queryAll, {
    enabled: false
  })
  return results;
} 

export default useQueryLotout;