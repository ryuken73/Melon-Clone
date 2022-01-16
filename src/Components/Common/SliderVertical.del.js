import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';

const CustomSlider = styled(Slider)`
    background: transparent;
    color: black !important;
    padding: 0px !important;
    & .MuiSlider-thumb {
        height: 8px;
        width: 8px;
    }
`

const VerticalSlider = () => {
    function preventHorizontalKeyboardNavigation(event) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
      }
    }
  
    return (
      <Box sx={{ height: 80 }}>
        <CustomSlider
        //   sx={{
        //     '& input[type="range"]': {
        //       WebkitAppearance: 'slider-vertical',
        //     },
        //   }}
          size="small"
          orientation="vertical"
          defaultValue={10}
          aria-label="Volume"
          onKeyDown={preventHorizontalKeyboardNavigation}
        />
      </Box>
    );
  }

  export default React.memo(VerticalSlider);