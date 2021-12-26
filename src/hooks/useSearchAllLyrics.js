import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

const queryAll = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, artistName, songName ] = queryKey;
  if(artistName === null && songName === null){
    return Promise.resolve(null);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useSearchAllLyrics = options => {

  const {keyword, artistName, songName, exactSearch, page_sizes=3} = options;
  const needExactSearch = exactSearch === 'yes';

  const paramsExact = {
    page_sizes,
    scn: 'lyrics', 
    query: `song_name_str = '${songName}' and artist_str='${artistName}' and status='Y'`,
    orderby: 'order by song_name_str asc'
  }

  const params = {
    page_sizes,
    scn: 'lyrics', 
    query: `lyc_idx = '${keyword}' allwordthruindexsyn and status='Y'`,
    orderby: 'order by song_name_str asc'
  }

  const {url: urlExact, fetchOptions: fetchOptionsExact} = apiMap.searchMusicAll({...paramsExact});
  const {url, fetchOptions} = apiMap.searchMusicAll({...params});

  const exactSearchResult = useQuery(['searchMusicAll', urlExact, fetchOptionsExact, artistName, songName, page_sizes, 'lyrics'], queryAll, {enabled:needExactSearch});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, keyword, page_sizes, 'lyrics'], queryAll, {enabled:!needExactSearch});

  const result = needExactSearch ? exactSearchResult : searchResult;

  return result;
} 

export default useSearchAllLyrics;