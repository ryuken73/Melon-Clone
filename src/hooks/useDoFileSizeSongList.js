import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQueries} from 'react-query';

const doFileSize = async ({queryKey}) => {
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

const useDoFileSizeSongList = (songList, gubun='M') => {
    const results = useQueries(songList.map(song => {
      const {url, fetchOptions} = apiMap.doFileSize(song.getFileSizeParams, gubun);
      return {
        queryKey: ['doFileSize', url, fetchOptions, song.getFileSizeParams, gubun],
        queryFn: doFileSize,
        enabled: false
      }
    }))  
    return results;
} 

export default useDoFileSizeSongList;