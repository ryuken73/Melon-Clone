import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

const queryAll = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, artistName ] = queryKey;
  if(artistName === null){
    return Promise.resolve(null);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useSearchAllArtists = options => {

  const {keyword, artistName, exactSearch, page_sizes} = options;
  const needExactSearch = exactSearch === 'yes';

  const paramsExact = {
    page_sizes: page_sizes,
    scn: 'artist', 
    query: `artist_str = '${artistName}'`,
    orderby: ''
  }

  const params = {
    page_sizes: page_sizes,
    scn: 'artist', 
    query: `art_idx = '${keyword}' allwordthruindexsyn`,
    orderby: ''
  }

  const {url: urlExact, fetchOptions: fetchOptionsExact} = apiMap.searchMusicAll({...paramsExact});
  const {url, fetchOptions} = apiMap.searchMusicAll({...params});

  const exactSearchResult = useQuery(['searchMusicAll', urlExact, fetchOptionsExact, artistName, page_sizes,'artist'], queryAll, {enabled:needExactSearch});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, keyword, page_sizes, 'artist'], queryAll, {enabled:!needExactSearch});

  const result = needExactSearch ? exactSearchResult : searchResult;

  return result;
} 

export default useSearchAllArtists;