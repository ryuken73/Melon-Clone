import {apiMap} from 'config/apis';
import {useQueries} from 'react-query';
import {getString} from 'lib/util';

const getDateString = (dayBefore) => {
    const targetDate = new Date(new Date().getTime() + dayBefore*24*60*60*1000);
    return getString(targetDate, {sep:''}).substring(0,8);
}

const queryAll = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  console.log('fetch called:', _key, queryKey)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const DEFAULT_PARAMS = {
  page_num: 1,
  page_sizes: 60,
  scn: 'archive', 
  query: `brd_dd >= ${getDateString(-1)}`,
  orderby: "order by brd_dd desc, brd_time desc",
  bool: true,
}


const useQueryArchives = (queryOptions, enabled=true) => {
  const optionsArray = Array.isArray(queryOptions) ? queryOptions : [queryOptions];
  const result = useQueries(optionsArray.map(options => {
    const params = {
      ...DEFAULT_PARAMS,
      ...options
    }
    const {url, fetchOptions} = apiMap.searchMusicAll({...params});
    return {
      queryKey: ['searchMusicAll', url, fetchOptions, params, 'archive'],
      queryFn: queryAll,
      enabled
    }
  }))
  return result;
} 

export default useQueryArchives;