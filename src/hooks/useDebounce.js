import * as React from 'react';
import {debounce} from 'lib/util';
import CONSTANTS from 'config/constants';

const useDebounce = value => {
    const [debounced, setDebounced] = React.useState(value);
    const debouncedFunc = React.useRef();
    React.useEffect(()=>{
        debouncedFunc.current = debounce(setDebounced, 100)
    },[])
    React.useEffect(() => {
        debouncedFunc.current && debouncedFunc.current(value);
    },[value])
    return debounced;
}

export default useDebounce;