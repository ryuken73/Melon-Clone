import * as React from 'react';
import {apiMap} from 'config/apis';
import {useInfiniteQuery} from 'react-query';
import CONSTANTS from 'config/constants';
const {DEFAULT_MAX_PAGES} = CONSTANTS.QUERY_MAX_PAGES;

const searchMusicAll = async ({queryKey, pageParam=1}) => {
  console.log('fetch called:',queryKey, pageParam)
  const [_key, paramsKey, page_num, page_sizes ] = queryKey;

  const params = typeof(paramsKey) === 'function' ? paramsKey() : paramsKey;

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

const useSearchMusicAllInfinite = options => {
  const {params, page_sizes, page_num, uniqKeys, max_pages=DEFAULT_MAX_PAGES} = options;
  // console.log('&&:', params, page_sizes, page_num)
  const searchResult = useInfiniteQuery(['searchMusicAll', params, page_num, page_sizes, uniqKeys], searchMusicAll, {
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage, pages); 
      if(lastPage.next_page_num > max_pages) {
        return undefined
      }
      return lastPage.next_page_num
    },
    staleTime: Infinity
  });

  return searchResult;
} 

export default useSearchMusicAllInfinite;