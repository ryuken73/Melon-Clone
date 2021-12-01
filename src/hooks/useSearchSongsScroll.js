import * as React from 'react';
import {apiMap} from 'config/apis';
import {useInfiniteQuery} from 'react-query';
import {getString} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';

const queryAll = async ({queryKey, pageParam=1}) => {
  console.log('fetch called:',queryKey)
  const [_key, artistName, songName, keyword, page_num, page_sizes, needExactSearch ] = queryKey;
  if(artistName === null && songName === null){
    return Promise.resolve(null);
  }
  const now = new Date();
  const currentTime = getString(now, {sep:''}).substr(0,12);

  const params = needExactSearch ?
                {
                  scn: 'song', 
                  query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
                  orderby: 'order by release_year desc,song_name_str asc'
                }:
                {
                  scn: 'song', 
                  query: `(song_idx = '${keyword}' allwordthruindexsyn or release_year='${keyword}' or label_no='${keyword}'and status='Y'
                          or song_name_str like '*${keyword}*' or artist_str like '*${keyword}*') and open_time<='${currentTime}' and status='Y'`,
                  orderby: 'order by release_year desc,song_name_str asc'
                }

  if(page_sizes !== null) params.page_sizes = page_sizes;
  params.page_num = pageParam;

  const {url, fetchOptions} = apiMap.searchMusicAll({...params});

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const result = await response.json();
  result.next_page_num = pageParam + 1;

  console.log('@@@@:', result);
  return result;
};

const useSearchSongsScroll = options => {

  const {keyword, artistName, songName, exactSearch} = options;
  const {page_sizes, page_num} = options;
  console.log('&&:', keyword, page_sizes, page_num)
  const needExactSearch = exactSearch === 'yes';
  console.log('^^ in useSearchAllSongs: exact Search ?:', needExactSearch);

  const searchResult = useInfiniteQuery(['searchMusicAll', artistName, songName, keyword, page_num, page_sizes, needExactSearch, 'song' ], queryAll, {
    getNextPageParam: (lastPage, pages) => {console.log(lastPage, pages); return lastPage.next_page_num}
  });

  return searchResult;
} 

export default useSearchSongsScroll;