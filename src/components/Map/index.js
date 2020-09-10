import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

import Popup from "./Popup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ spots, width, height, center, zoom }) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: center ? center : spots ? spots.coords : [-10, 30],
      zoom: zoom || 10,
    });

    map.on("load", () => {
      map.addSource("random-points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: spots ? spots.geoJSON : [],
        },
      });

      map.addLayer({
        id: "random-points-layer",
        source: "random-points-data",
        type: "symbol",
        layout: {
          "icon-image": "marker-15",
          "icon-padding": 0,
          "icon-allow-overlap": true,
        },
      });
    });

    map.on("click", "random-points-layer", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={feature} />, popupNode);
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, [spots, center]);

  return (
    <Wrapper width={width} height={height}>
      <Container className="map-container" ref={mapContainerRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  flex: ${(props) => `0 0 ${props.width || "100%"}`};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: 8px;
  overflow: hidden;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default Map;
