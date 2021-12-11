import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery, useQueries} from 'react-query';

const removeExtraCharsFromArtist = artist => {
  const extraChars = ['(', ')', 'Feat.', 'FEAT.', '&'];
  let removed = artist;
  extraChars.forEach(char => {
    removed = removed.replace(char, '');
  })
  return removed;


}

const queryArtist = async ({queryKey}) => {
  const [_key, url, options ] = queryKey;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useArtistId = (artistsArray, matched) => {
  const results = useQueries(artistsArray.map(artist => {
    if(artist.includes('<span') && artist.includes('</span>')){
      const {url, fetchOptions} = apiMap.doListArtist(matched);
      return {
        queryKey: ['doListArtist', url, fetchOptions, matched],
        queryFn: queryArtist,
        enabled: false,
        staleTime: Infinity
      }
    } else {
      const artistNormalized = removeExtraCharsFromArtist(artist)
      const {url, fetchOptions} = apiMap.doListArtist(artistNormalized);
      return {
        queryKey: ['doListArtist', url, fetchOptions, artistNormalized],
        queryFn: queryArtist,
        enabled: false,
        staleTime: Infinity
      }
    }
  }))
  return results;
}
export default useArtistId;