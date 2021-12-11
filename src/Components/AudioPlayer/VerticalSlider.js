import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import usePlayerEvent from 'hooks/usePlayerEvent';

const CustomSlider = styled(Slider)`
    background: transparent;
    color: black !important;
    padding: 0px !important;
    & .MuiSlider-thumb {
        height: 8px;
        width: 8px;
    }
`

const volumeToSliderValue = volume => volume * 100;
const sliderValueToVolume = value => value / 100;

const VerticalSlider = props => {
  const {manifestLoaded, playerRef} = props;
  const {volume, handleVolumeControl} = usePlayerEvent(manifestLoaded, playerRef);
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  const value = React.useMemo(() => {
    console.log('^^^:', volume)
    return volumeToSliderValue(volume)
  },[volume])

  const onChangeValue = React.useCallback((event, value) => {
    console.log('^^^:', value)
    const volume = sliderValueToVolume(value);
    handleVolumeControl(volume)
  },[handleVolumeControl])

  return (
    <Box sx={{ height: 80 }}>
      <CustomSlider
      //   sx={{
      //     '& input[type="range"]': {
      //       WebkitAppearance: 'slider-vertical',
      //     },
      //   }}
        value={value}
        onChange={onChangeValue}
        size="small"
        orientation="vertical"
        defaultValue={50}
        aria-label="Volume"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
  }

  export default React.memo(VerticalSlider);