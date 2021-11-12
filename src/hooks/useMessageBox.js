import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showMessageBoxForDuration } from 'appSlice';


function useMessageBox(text='') {
  const dispatch = useDispatch();

  const showMessageBox = useEffect((text, duration) => {
      dispatch(showMessageBoxForDuration(text, duration))
  },[dispatch])

  return [showMessageBox];
}

export default useMessageBox;