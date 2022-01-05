import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryAll = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  console.log('fetch called:', _key, queryKey)
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useQueryProgramList = (chan_cd='A',enabled=true) => {
  const {url, fetchOptions} = 
    chan_cd === 'ONAIR' || chan_cd === 'END' ?
    apiMap['doPgmListSearch.mb']({}) :
    apiMap['doProgramList'](1, 30, chan_cd) ;
  const searchResult = useQuery(['doListProgramList', url, fetchOptions, chan_cd, 'programList'], queryAll, {
    enabled
  });
  return searchResult;
} 

export default useQueryProgramList;