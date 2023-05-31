import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="carousel-button-group">
      {/* <div className='navigations'>
          <button onClick={() => previous()} className='me-3'>
            <i className='icon icon-arrow-left-short'></i>
          </button>
          <button onClick={() => next()}>
            <i className='icon icon-arrow-right-short'></i>
          </button>
        </div> */}
    </div>
  );
};

export default function MatchProfileslider() {
  return (
    <>
      <div className="matchprofileslider-wrapper">
      <Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;
      </div>
    </>
  );
}
