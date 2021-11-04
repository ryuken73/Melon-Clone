import {useSelector} from 'react-redux';

function useAlbumInfo(receipt_no) {
  // console.log('AlbumDetailInfo:', receipt_no)
  const albumInfo = useSelector((state) => state.album.albumInfo[receipt_no]);
  return albumInfo || {};
}

export default useAlbumInfo;