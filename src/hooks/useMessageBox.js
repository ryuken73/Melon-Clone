import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessageBoxForDuration, setMessageBoxText } from 'appSlice';


function useMessageBox(text='') {
  const [msgBoxText, setText] = useState(text);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessageBoxText(msgBoxText));
  }, [msgBoxText, dispatch]); 

  return [showMessageBoxForDuration, setText];
}

export default useMessageBox;