import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';
import {useSelector, useDispatch} from 'react-redux';

const queryAll = async ({queryKey}) => {
  console.log('fetch called:',queryKey)
  const [_key, url, options, artistName, songName ] = queryKey;
  if(artistName === null && songName === null){
    return Promise.resolve(null);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

const useSearchAllSongs = keyword => {

  console.log('&&:', keyword)
  const {artistName, songName, inputValue} = useSelector(state => state.autoComplete)
  const needExactSearch = artistName !== '' || songName !== '';
  console.log('^^ in useSearchAllSongs: need exact Search');
  const now = new Date();
  const currentTime = getString(now, {sep:''}).substr(0,12);

  const paramsExact = {
    scn: 'song', 
    query: `(song_name_str = '${songName}' and artist_str = '${artistName}') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,song_name_str asc'
  }

  const params = {
    scn: 'song', 
    query: `(song_idx = '${inputValue}' allwordthruindexsyn or release_year='${inputValue}' or label_no='${inputValue}'and status='Y'
            or song_name_str like '*${inputValue}*' or artist_str like '*${inputValue}*') and open_time<='${currentTime}' and status='Y'`,
    orderby: 'order by release_year desc,song_name_str asc'
  }

  // const artistParams = {
  //   scn: 'artist', 
  //   query: `artist_str='${artistName}'`,
  //   orderby: ''
  // }
  // const albumParams = {
  //   scn: 'album', 
  //   query: `(song_name_str='*${songName}*' and artist_str='${artistName}') and open_time=${currentTime} and status='Y'`,
  //   orderby: 'order by release_year desc, album_name_str asc'
  // }
  // const lyricsParams = {
  //   scn: 'lyrics', 
  //   query: `song_name_str='${songName}' and artist_str='${artistName}' status='Y'`,
  //   orderby: 'order by song_name_str asc'
  // }

  const {url: urlExact, fetchOptions: fetchOptionsExact} = apiMap.searchMusicAll({...paramsExact});
  const {url, fetchOptions} = apiMap.searchMusicAll({...params});
  // const {url: urlAlbum, fetchOptions: fetchOptionsAlbum} = apiMap.searchMusicAll({...albumParams});
  // const {url: urlArtist, fetchOptions: fetchOptionsArtist} = apiMap.searchMusicAll({...artistParams});
  // const {url: urlLyrics, fetchOptions: fetchOptionsLyrics} = apiMap.searchMusicAll({...lyricsParams});

  const exactSearchResult = useQuery(['searchMusicAll', urlExact, fetchOptionsExact, artistName, songName], queryAll, {enabled:needExactSearch});
  const searchResult = useQuery(['searchMusicAll', url, fetchOptions, inputValue], queryAll, {enabled:!needExactSearch});
  // const albumResults =  useQuery(['searchMusicAll', urlAlbum, fetchOptionsAlbum, artistName, songName], queryAll, {enabled:false});
  // const artistResults =  useQuery(['searchMusicAll', urlArtist, fetchOptionsArtist, artistName, songName], queryAll, {enabled:false});
  // const lyricsResults =  useQuery(['searchMusicAll', urlLyrics, fetchOptionsLyrics, artistName, songName], queryAll, {enabled:false});

  const result = needExactSearch ? exactSearchResult : searchResult;

  return result;
} 

export default useSearchAllSongs;