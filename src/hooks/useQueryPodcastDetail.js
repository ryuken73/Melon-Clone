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
  return response.json()
};

const useQueryPodcastDetail = media_id => {
  console.log('^^^', media_id)
  const {url, fetchOptions} = apiMap['doPodCastPgmInfoSelectView.mb']({media_id});
  const results = useQuery(['doPodCastPgmInfoSelectView.mb', url, fetchOptions, media_id], queryAll, {
    enabled: false
  })
  return results;
} 

export default useQueryPodcastDetail;