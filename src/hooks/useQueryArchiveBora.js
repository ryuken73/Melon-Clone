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

const useQueryArchiveBora = (asset_id, bora_archive_yn) => {
  const {url, fetchOptions} = apiMap['doListBoraRadioAttach.mb'](asset_id, bora_archive_yn);
  const results = useQuery(['doListBoraRadioAttach.mb', url, fetchOptions, asset_id], queryAll, {
    enabled: false
  })
  return results;
} 

export default useQueryArchiveBora;