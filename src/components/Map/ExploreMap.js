import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setMapViewportAction } from "../../reducers/map";
import { exploreSpotsAction } from "../../reducers/spots";

import Popup from "./Popup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ width, height }) => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const { pending, data, error } = useSelector((state) => state.spots);
  const { zoom, cLat, cLng, neLat, neLng, swLat, swLng, focus } = useSelector(
    (state) => state.map
  );

  const [map, setMap] = useState(null);

  const fetchSpots = (map) => {
    const zoom = map.getZoom();
    const { _ne, _sw } = map.getBounds();
    const { lat, lng } = map.getCenter();

    const viewport = {
      zoom,
      cLat: lat,
      cLng: lng,
      neLat: _ne.lat,
      neLng: _ne.lng,
      swLat: _sw.lat,
      swLng: _sw.lng,
    };

    dispatch(exploreSpotsAction(viewport));
    dispatch(setMapViewportAction(viewport));
  };

  // Initialize map and add event handlers
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/clockworkftw/ckersb0f34k7o19mz3u1we53c",
      center: [cLng, cLat],
      zoom,
    });

    // Add a new source and layer to the map for displaying spots
    map.on("load", () => {
      map.addSource("spots-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
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

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add popup on click
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

    // Fetch new spots after the map has moved
    map.on("moveend", () => {
      console.log(cLat, neLat);
      fetchSpots(map);
    });

    // Fetch spots during first render
    fetchSpots(map);

    // Add the map to state so it can be accessed in other useEffect functions
    setMap(map);

    // Remove the map after the component unmounts
    return () => map.remove();
  }, []);

  // Update spots data source whenever new spots are fetched
  useEffect(() => {
    if (map) {
      const spots = { type: "FeatureCollection", features: data.geoJSON };
      map.getSource("spots-data").setData(spots);
    }
  }, [data]);

  // Update map center
  useEffect(() => {
    if (map) {
      map.setCenter([cLng, cLat]);
    }
  }, [cLat, cLng]);

  // Add popup
  useEffect(() => {
    if (map) {
      const popupNode = document.createElement("div");
      ReactDOM.render(<Popup feature={focus} />, popupNode);
      popUpRef.current
        .setLngLat(focus.geometry.coordinates)
        .setDOMContent(popupNode)
        .addTo(map);
    }
  }, [focus]);

  return (
    <Wrapper width={width} height={height}>
      {pending && <Loader />}
      <Container className="map-container" ref={mapContainerRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  flex: ${(props) => `0 0 ${props.width || "100%"}`};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background: #a0aec0;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Loader = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 10px;
  background: #ed8936;
`;

export default Map;
