import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQueries} from 'react-query';

const doFileSize = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, getFileSizeParams, song] = queryKey;
  // console.log('@@@@:', getFileSizeParams)
  if(getFileSizeParams === 'archive'){
    return Promise.resolve({
      status:'success', 
      song_list:[{
          receipt_no: song.receipt_no,
          wavsize: song.wavsize,
          reg_no: song.reg_no
        }
      ]
    })
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
        queryKey: ['doFileSize', url, fetchOptions, song.getFileSizeParams, song, gubun],
        queryFn: doFileSize,
        enabled: false
      }
    }))  
    return results;
} 

export default useDoFileSizeSongList;