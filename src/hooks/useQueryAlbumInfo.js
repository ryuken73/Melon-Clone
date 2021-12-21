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

const useQueryAlbumInfo = (receipt_no, enabled=true) => {
  const {url, fetchOptions} = apiMap['doListAlbum.mb'](receipt_no);
  const searchResult = useQuery(['doListAlbum.mb', url, fetchOptions, receipt_no, 'albumInfo'], queryAll, {
    enabled
  });
  return searchResult;
} 

export default useQueryAlbumInfo;