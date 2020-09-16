import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setMapAction } from "../../reducers/map";
import { exploreSpotsAction } from "../../reducers/spots";

import Popup from "./Popup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ width, height }) => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const { pending, data, error } = useSelector((state) => state.spots);
  // prettier-ignore
  const { zoom, cLat, cLng, neLat, neLng, swLat, swLng, focus } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);

  const getViewport = (map) => {
    const zoom = map.getZoom();

    const { _ne, _sw } = map.getBounds();
    const { lat, lng } = map.getCenter();

    return {
      zoom,
      cLat: lat,
      cLng: lng,
      neLat: _ne.lat,
      neLng: _ne.lng,
      swLat: _sw.lat,
      swLng: _sw.lng,
    };
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

      // Fetch spots after initial load
      dispatch(exploreSpotsAction(getViewport(map)));

      // Add the map to state so it can be accessed in other useEffect functions
      setMap(map);
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

    // Update the viewport state after the map has been moved
    map.on("zoomend", () => {
      dispatch(setMapAction(getViewport(map)));
    });
    map.on("dragend", () => {
      dispatch(setMapAction(getViewport(map)));
    });

    // Remove the map after the component unmounts
    return () => map.remove();
  }, []);

  // Update map viewport when using search bar
  useEffect(() => {
    if (map) {
      map.setZoom(zoom);
      map.setCenter([cLng, cLat]);
      dispatch(setMapAction(getViewport(map)));
    }
  }, [zoom, cLat, cLng]);

  // Fetch new spots whenever the viewport changes
  useEffect(() => {
    if (map) {
      if (zoom > 8) {
        dispatch(exploreSpotsAction(getViewport(map)));
      }
    }
  }, [neLat, neLng, swLat, swLng]);

  // Update spots data source whenever new spots are fetched
  useEffect(() => {
    if (map) {
      const spots = { type: "FeatureCollection", features: data.geoJSON };
      map.getSource("spots-data").setData(spots);
    }
  }, [data]);

  // Add popup
  useEffect(() => {
    if (map) {
      if (focus) {
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={focus} />, popupNode);
        popUpRef.current
          .setLngLat(focus.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      } else {
        popUpRef.current.remove();
      }
    }
  }, [focus]);

  return (
    <Wrapper width={width} height={height}>
      {pending || (error && <Status error={error} />)}
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

const Status = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 10px;
  background: ${({ error }) => (error ? "#F56565" : "#ed8936")};
`;

export default Map;
