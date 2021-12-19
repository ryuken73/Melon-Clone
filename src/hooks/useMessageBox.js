import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showMessageBoxForDuration } from 'appSlice';


function useMessageBox() {
  const dispatch = useDispatch();

  const showMessageBox = useCallback((text, duration) => {
      dispatch(showMessageBoxForDuration(text, duration))
  },[dispatch])

  return {showMessageBox};
}

export default useMessageBox;