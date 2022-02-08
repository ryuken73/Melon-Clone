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


const useQueryPodcastProgramList = options => {
  const params = {
    b_ipp: 1,
    b_page: 100,
    complt_yn: 'N', 
    service_yn: 'Y',
    ...options
  }

  const {url, fetchOptions} = apiMap['doPodCastPgmListSearch.mb']({...params});
  const searchResult = useQuery(['doPodCastPgmListSearch.mb', url, fetchOptions, params, 'podcastProgram'], queryAll);
  return searchResult;
} 

export default useQueryPodcastProgramList;