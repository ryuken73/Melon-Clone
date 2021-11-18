import * as React from 'react';
import {apiMap} from 'config/apis';
import {useQuery} from 'react-query';
import {getString} from 'lib/util';

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

const useSearchAllExact = value => {
  const {artistName, songName} = value !== null ? value : {artistName:null, songName:null};
  const now = new Date();
  const currentTime = getString(now, {sep:''});

  const songParams = {
    scn: 'song', 
    query: `(song_name_str='${songName}' and artist_str='${artistName})' and open_time=${currentTime} and status='Y'`,
    orderby: 'order by release_year desc, song_name_str asc'
  }
  const artistParams = {
    scn: 'artist', 
    query: `artist_str='${artistName}'`,
    orderby: ''
  }
  const albumParams = {
    scn: 'album', 
    query: `(song_name_str='*${songName}*' and artist_str='${artistName}') and open_time=${currentTime} and status='Y'`,
    orderby: 'order by release_year desc, album_name_str asc'
  }
  const lyricsParams = {
    scn: 'lyrics', 
    query: `song_name_str='${songName}' and artist_str='${artistName}' status='Y'`,
    orderby: 'order by song_name_str asc'
  }

  const {url: urlSong, fetchOptions: fetchOptionsSong} = apiMap.searchMusicAll({...songParams});
  const {url: urlAlbum, fetchOptions: fetchOptionsAlbum} = apiMap.searchMusicAll({...albumParams});
  const {url: urlArtist, fetchOptions: fetchOptionsArtist} = apiMap.searchMusicAll({...artistParams});
  const {url: urlLyrics, fetchOptions: fetchOptionsLyrics} = apiMap.searchMusicAll({...lyricsParams});

  const songResults = useQuery(['searchMusicAll', urlSong, fetchOptionsSong, artistName, songName], queryAll, {enabled:false});
  const albumResults =  useQuery(['searchMusicAll', urlAlbum, fetchOptionsAlbum, artistName, songName], queryAll, {enabled:false});
  const artistResults =  useQuery(['searchMusicAll', urlArtist, fetchOptionsArtist, artistName, songName], queryAll, {enabled:false});
  const lyricsResults =  useQuery(['searchMusicAll', urlLyrics, fetchOptionsLyrics, artistName, songName], queryAll, {enabled:false});

  return [songResults, albumResults, artistResults, lyricsResults]
} 

export default useSearchAllExact;