import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import colors from '../../config/colors';

const SmallCheckBox = props => {
  const {checked, setChecked} = props;
  const handleChange = React.useCallback(event => {
    setChecked(event.target.checked);
  }, [setChecked])
  return (
    <div>
      <Checkbox
        {...props}
        checked={checked}
        onChange={handleChange}
        sx={{ 
            color: colors.textSub,
            '&.Mui-checked': {
              color: 'white',
              opacity: 0.5
            },
            '& .MuiSvgIcon-root': { fontSize: 15 } 
        }}
      />
    </div>
  );
}

export default SmallCheckBox;