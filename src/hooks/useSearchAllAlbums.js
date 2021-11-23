import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';

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

const useSearchAllAlbums = options => {

  const {keyword, artistName, songName, exactSearch} = options;
  const needExactSearch = exactSearch === 'yes';
  console.log('^^ in useSearchAllSongs: exact Search ?:', needExactSearch);
  const now = new Date();
  const currentTime = getString(now, {sep:''}).substr(0,12);

  const paramsExact = {
    scn: 'album', 
    query: `(song_name_str like '*${songName}*' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,song_name_str asc'
  }

  const params = {
    scn: 'album', 
    query: `(album_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or arrang_type_nm='${keyword}' 
             or label_no='${keyword}'and status='Y') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,album_name_str asc'
  }

  const {url: urlExact, fetchOptions: fetchOptionsExact} = apiMap.searchMusicAll({...paramsExact});
  const {url, fetchOptions} = apiMap.searchMusicAll({...params});

  const exactSearchResult = useQuery(['searchMusicAll', urlExact, fetchOptionsExact, artistName, songName, 'album'], queryAll, {enabled:needExactSearch});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, keyword, 'album'], queryAll, {enabled:!needExactSearch});

  const result = needExactSearch ? exactSearchResult : searchResult;

  return result;
} 

export default useSearchAllAlbums;