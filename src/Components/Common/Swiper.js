import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CONSTANT from 'config/constants';

const slickOpts = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: CONSTANT.SWIPE_SLIDE_SPEED,
    slidesToShow: CONSTANT.SWIPE_SLIDE_TO_SHHOW,
    slidesToScroll: CONSTANT.SWIPE_SLIDE_TO_SCROLL
  };

const Swiper = props => {
    const {children} = props;
    const [swiped, setSwiped] = React.useState(false)

    const handleSwiped = React.useCallback(() => {
      setSwiped(true)
      console.log('swipe')

    }, [setSwiped])

    const handleSwipeEdge = event => {
      console.log('edge')
    }
  
    const handleOnItemClick = React.useCallback(
      (e) => {
        if (swiped) {
          e.stopPropagation()
          e.preventDefault()
          setSwiped(false)
        }
      },
      [swiped],
    )
    return (
        <Slider
            onSwipe={handleSwiped}
            onReinit={handleSwipeEdge}
            {...slickOpts}
        >
            {React.Children.map(children, child => (
                <div onClickCapture={handleOnItemClick}>{child}</div>
            ))}
        </Slider>
    )
}

export default React.memo(Swiper)