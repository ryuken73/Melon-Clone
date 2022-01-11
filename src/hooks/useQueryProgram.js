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

const useQueryProgram = (pgm_cd) => {
  const {url, fetchOptions} = apiMap['doValueAlbum2.mb']({pgm_cd}) ;
  const searchResult = useQuery(['doValueAlbum2.mb', url, fetchOptions, pgm_cd, 'program'], queryAll);
  return searchResult;
} 

export default useQueryProgram;