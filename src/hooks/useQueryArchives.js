import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

const getDateTimeString = () => {
    const now = new Date();
    return getString(now, {sep:''}).substring(0,12);
}

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


const useQueryArchives = (page_num=1, page_sizes=60) => {
  const params = {
    page_num,
    page_sizes,
    scn: 'archive', 
    query: `brd_dd >= ${getDateString(-1)}`,
    orderby: "order by brd_dd desc, brd_time desc",
    bool: true
  }

  const {url, fetchOptions} = apiMap.searchMusicAll({...params});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, params, 'archive'], queryAll);
  return searchResult;
} 

export default useQueryArchives;