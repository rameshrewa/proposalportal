import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import config from "../../assets/config";
import Editadminicon from "../../assets/images/edit-icon.svg";
import { useHistory } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function PhotoSliderSection(props) {
  const { UserPhotos, typeValue } = props;
  let history = useHistory();
  const goBack = () => {
    history.push("/photo-upload");
  };
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="carousel-button-group">
        <div className="navigations">
          <button onClick={() => previous()} className="me-3">
            left
          </button>
          <button onClick={() => next()}>right</button>
        </div>
      </div>
    );
  };
  return (
    <>
      {UserPhotos ? (
        <div className="matchprofileslider-wrapper">
          <Carousel
            arrows={true}
            responsive={responsive}
            customButtonGroup={<ButtonGroup />}
          >
            {UserPhotos &&
              UserPhotos.map((item, index) => {
                return (
                  <div key={index + 1} className="matchprofileslider-wrapper">
                    <img
                      src={config.imageUrl + item.candidate_photo_url}
                      alt="Daaji-planting-a-sapling"
                      height="250px"
                      width="250px"
                    />
                  </div>
                );
              })}
          </Carousel>

          {typeValue && typeValue !== "recommended" && (
            <span className="float-rg" onClick={goBack}>
              <img src={Editadminicon} alt="Icon" nn className="img-fluid" />
            </span>
          )}
        </div>
      ) : null}
    </>
  );
}
