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

const useQueryLogin = (userid, password, enabled=false) => {
  const {url, fetchOptions} = apiMap['doView.do']({userid, password});
  const results = useQuery(['doView.do', url, fetchOptions, userid, password], queryAll, {
    enabled
  })
  return results;
} 

export default useQueryLogin;