import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

import Popup from "./Popup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ spots, center, zoom, width, height }) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/clockworkftw/ckersb0f34k7o19mz3u1we53c",
      center: center,
      zoom: zoom,
    });

    // Add a new source and layer to the map for displaying spots
    map.on("load", () => {
      map.addSource("spots-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: spots,
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "spots-data",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#ED8936",
          "circle-radius": 16,
          "circle-stroke-color": "white",
          "circle-stroke-width": 3,
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "spots-data",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 14,
        },
        paint: {
          "text-color": "white",
        },
      });

      map.addLayer({
        id: "spots-layer",
        source: "spots-data",
        filter: ["!", ["has", "point_count"]],
        type: "symbol",
        layout: {
          "icon-image": "pin",
          "icon-size": 0.08,
          "icon-padding": 0,
          "icon-allow-overlap": true,
        },
      });
    });

    map.on("click", "spots-layer", (e) => {
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
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
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
