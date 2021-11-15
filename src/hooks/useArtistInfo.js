import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';

const queryArtist = async ({queryKey}) => {
  // console.log('^^ fetch called:',queryKey)
  const [_key, url, options, artist_id ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useArtistInfo = artist_name => {
  const {url, fetchOptions} = apiMap.doListArtist(artist_name);
  const {isLoading, isSuccess:successListArtist, error, data:dataListArtist} = useQuery(['doListArtist', url, fetchOptions, artist_name], queryArtist, {
    enabled: !!artist_name
  });  
  const sch_id = successListArtist && dataListArtist.list.length > 0 ?
                 dataListArtist.list[0].id :
                 null;
  const {url:url2, fetchOptions:options2} = apiMap.doGetArtistInfo(sch_id);
  const {isSuccess:successArtistInfo, data:dataArtistInfo} = useQuery(['doGetArtistInfo', url2, options2, sch_id], queryArtist, {
    enabled: !!sch_id
  })
  return {successListArtist, dataListArtist, successArtistInfo, dataArtistInfo};
} 

export default useArtistInfo;