import { useState, useEffect, useRef } from 'react';

function usePrevious(value) {
//   const ref = useRef();
const [preValue, setPreValue] = useState('')

  useEffect(() => {
    // ref.current = value;
    setPreValue(preValue)
  }, [value]); 

  return preValue;
}

export default usePrevious;