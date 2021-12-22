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

const useQueryProgramList = (channel_cd='A',enabled=true) => {
  const {url, fetchOptions} = apiMap['doProgramList'](1, 30, channel_cd);
  const searchResult = useQuery(['doListProgramList', url, fetchOptions, channel_cd, 'programList'], queryAll, {
    enabled
  });
  return searchResult;
} 

export default useQueryProgramList;