import * as React from 'react';
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

const useQueryArchiveDetail = media_id => {
  // const [asset_id, setAssetId] = React.useState(null);
  // const [url2, setUrl2] = React.useState(null);
  // const [options2, setOptions2] = React.useState(null);
  const {url, fetchOptions} = apiMap['doValueRadio.mb'](media_id);
  const results = useQuery(['doValueRadio.mb', url, fetchOptions, media_id], queryAll, {
    enabled: false
  })
  // React.useEffect(() => {
  //   const asset_id = results.data?.ops_get?.ops_content_id;
  //   const bora_archive_yn = results.data?.get.bora_archive_yn;
  //   const {url, fetchOptions} = apiMap['doListBoraRadioAttach.mb'](asset_id, bora_archive_yn);
  //   setAssetId(asset_id)
  //   setUrl2(url);
  //   setOptions2(fetchOptions);
  // },[results.data])

  // const resultFinal = useQuery(['doListBoraRadioAttach.mb', url2, options2, asset_id], queryAll, {
  //   enabled: !!asset_id
  // })
  return results;
} 

export default useQueryArchiveDetail;