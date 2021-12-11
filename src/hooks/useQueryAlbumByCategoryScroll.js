import * as React from 'react';
import {apiMap} from 'config/apis';
import {useInfiniteQuery} from 'react-query';
import {getString} from 'lib/util';

const genre = {
  'kpop': 4,
  'pop': 58,
  'classic': 144,
  'etc': 0
}

const getDateTimeString = () => {
  const now = new Date();
  return getString(now, {sep:''}).substring(0,8);
}

const queryAll = async ({queryKey, pageParam=1}) => {
  console.log('fetch called:',queryKey)
  const [_key, category, page_num, page_sizes ] = queryKey;
  const genreNum = genre[category];
  const additionalQuery = category === 'all' ? '' : `and top_genre=${genreNum}`;

  const params = {
    scn: 'album', 
    query: `status='Y' and open_dt <= '${getDateTimeString()}' ${additionalQuery}`,
    orderby: 'order by open_dt desc',
    bool: true
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

const useQueryAlbumScroll = options => {
  const {category, page_sizes, page_num} = options;
  console.log('&&:', category, page_sizes, page_num)

  const searchResult = useInfiniteQuery(['searchMusicAll', category, page_num, page_sizes, 'albumScroll' ], queryAll, {
    getNextPageParam: (lastPage, pages) => {console.log(lastPage, pages); return lastPage.next_page_num},
    staleTime: Infinity
  });

  return searchResult;
} 

export default useQueryAlbumScroll;