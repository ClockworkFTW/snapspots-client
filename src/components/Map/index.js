import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ geoJSON }) => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749],
      zoom: 10,
    });

    geoJSON.forEach((point) => {
      const { id, geometry } = point;
      // create marker node
      const markerNode = document.createElement("div");
      ReactDOM.render(<Marker id={id} />, markerNode);
      // add marker to map
      new mapboxgl.Marker(markerNode)
        .setLngLat(geometry.coordinates)
        .addTo(map);
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // clean up on unmount
    return () => map.remove();
  }, [geoJSON]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Container className="map-container" ref={mapContainerRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  margin: 40px 0;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Marker = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: red;
  cursor: pointer;
`;

export default Map;
