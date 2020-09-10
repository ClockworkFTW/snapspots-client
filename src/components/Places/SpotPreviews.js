import React from "react";

// Import custom components
import SpotCardSmall from "./SpotCardSmall";

// Import router components
import { Link } from "react-router-dom";

// Import Swiper components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Instal Swiper components
SwiperCore.use([Autoplay]);

const SpotPreview = ({ spots }) => (
  <Swiper
    spaceBetween={20}
    slidesPerView={3}
    autoplay={{ delay: 3000 }}
    disableOnInteraction={false}
    loop={true}
  >
    {spots.geoJSON.map((spot, i) => (
      <SwiperSlide>
        <Link
          to={`/spot/${spot.properties.spot_id}`}
          style={{ textDecoration: "none" }}
        >
          <SpotCardSmall key={i} spot={spot} />
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default SpotPreview;
