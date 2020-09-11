import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const PickMap = ({ children, width, height }) => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);

  const { cLat, cLng } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);

  // Initialize map and add event handlers
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/clockworkftw/ckersb0f34k7o19mz3u1we53c",
      center: [-10, 30],
      zoom: 1,
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add popup on click
    // map.on("click", "spots-layer", (e) => {
    //   if (e.features.length) {
    //     const feature = e.features[0];
    //     const popupNode = document.createElement("div");
    //     ReactDOM.render(<Popup feature={feature} />, popupNode);
    //     popUpRef.current
    //       .setLngLat(feature.geometry.coordinates)
    //       .setDOMContent(popupNode)
    //       .addTo(map);
    //   }
    // });

    // Add the map to state so it can be accessed in other useEffect functions
    setMap(map);

    // Remove the map after the component unmounts
    return () => map.remove();
  }, []);

  // Update map center
  useEffect(() => {
    if (map) {
      map.setCenter([cLng, cLat]);
      map.setZoom(12);
    }
  }, [cLat, cLng]);

  return (
    <Wrapper width={width} height={height}>
      {children && <Children>{children}</Children>}
      <Container className="map-container" ref={mapContainerRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  flex: ${({ width }) => `0 0 ${width || "100%"}`};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
`;

const Children = styled.div`
  z-index: 10;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 8px;
  overflow: hidden;
`;

export default PickMap;
