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

const useQueryPodcastProgram = (audio_pgm_id, enabled=false) => {
  console.log('^^^', audio_pgm_id)
  const {url, fetchOptions} = apiMap['doPodCastPgmSelectView.mb']({audio_pgm_id});
  const results = useQuery(['doPodCastPgmSelectView.mb', url, fetchOptions, audio_pgm_id], queryAll, {
    enabled
  })
  return results;
} 

export default useQueryPodcastProgram;