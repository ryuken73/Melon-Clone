import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slickOpts = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

const Swiper = props => {
    const {children} = props;
    const [swiped, setSwiped] = React.useState(false)

    const handleSwiped = React.useCallback(() => {
      setSwiped(true)
    }, [setSwiped])
  
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
            {...slickOpts}
        >
            {React.Children.map(children, child => (
                <div onClickCapture={handleOnItemClick}>{child}</div>
            ))}
        </Slider>
    )
}

export default React.memo(Swiper)