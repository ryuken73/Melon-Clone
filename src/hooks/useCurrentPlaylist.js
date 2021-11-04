import {useSelector} from 'react-redux';

function useCurrentPlaylist() {
  // console.log('AlbumDetailInfo:', receipt_no)
  console.log('#### useCurrentPlaylist')
  const currentPlaylist = useSelector((state) => state.playlist.currentPlaylist);
  return currentPlaylist || [];
}

export default useCurrentPlaylist;