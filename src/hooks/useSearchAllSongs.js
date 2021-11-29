import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';

const queryAll = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, artistName, songName, keyword ] = queryKey;
  if(artistName === null && songName === null){
    return Promise.resolve(null);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useSearchAllSongs = options => {

  const {keyword, artistName, songName, exactSearch} = options;
  const {page_sizes, page_num} = options;
  console.log('&&:', keyword, page_sizes, page_num)
  const needExactSearch = exactSearch === 'yes';
  console.log('^^ in useSearchAllSongs: exact Search ?:', needExactSearch);
  const now = new Date();
  const currentTime = getString(now, {sep:''}).substr(0,12);

  const paramsExact = {
    scn: 'song', 
    query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,song_name_str asc'
  }

  const params = {
    scn: 'song', 
    query: `(song_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
            or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,song_name_str asc'
  }

  if(page_sizes !== null) params.page_sizes = page_sizes;
  if(page_num !== null) params.page_num = page_num;

  const {url: urlExact, fetchOptions: fetchOptionsExact} = apiMap.searchMusicAll({...paramsExact});
  const {url, fetchOptions} = apiMap.searchMusicAll({...params});

  const exactSearchResult = useQuery(['searchMusicAll', urlExact, fetchOptionsExact, artistName, songName, 'song'], queryAll, {enabled:needExactSearch});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, keyword, 'song', page_sizes, page_num], queryAll, {enabled:!needExactSearch});

  const result = needExactSearch ? exactSearchResult : searchResult;

  return result;
} 

export default useSearchAllSongs;