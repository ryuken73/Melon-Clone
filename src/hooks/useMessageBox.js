import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessageBoxForDuration, setMessageBoxText } from 'appSlice';


function useMessageBox(text='') {
  const [msgBoxText, setText] = useState(text);
  const dispatch = useDispatch();

  const showMessageBoxDispatch = React.useEffect((duration) => {
    return () => {
      dispatch(showMessageBoxForDuration(duration))
    }
  },[dispatch])

  useEffect(() => {
    dispatch(setMessageBoxText(msgBoxText));
  }, [msgBoxText, dispatch]); 

  return [showMessageBoxDispatch, setText];
}

export default useMessageBox;