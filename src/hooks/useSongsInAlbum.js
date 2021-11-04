import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doListAlbum } from 'Components/Album/albumSlice';

function useSongsInAlbum(receipt_no) {
  const songsInAlbum = useSelector((state) => state.album.songListInAlbum[receipt_no]);
  const dispatch = useDispatch();
  React.useEffect(()=>{
      dispatch(doListAlbum({receipt_no}));
  },[receipt_no, dispatch])

  return songsInAlbum || [];
}

export default useSongsInAlbum;