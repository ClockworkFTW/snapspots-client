import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setSpotAction } from "../../reducers/spot";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const PickMap = ({ editing, children, width, height }) => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);

  const { cLat, cLng } = useSelector((state) => state.map);
  const { data } = useSelector((state) => state.spot);

  const center = [data.longitude, data.latitude];
  const zoom = editing ? 12 : 1;
  const setFeature = ({ lat, lng }) => [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
      properties: {},
    },
  ];

  const [map, setMap] = useState(null);
  const [alert, setAlert] = useState(null);

  // Initialize map and add event handlers
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/clockworkftw/ckersb0f34k7o19mz3u1we53c",
      center,
      zoom,
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add a new source and layer to the map for displaying spots
    map.on("load", () => {
      map.addSource("spot-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: editing
            ? setFeature({ lat: data.latitude, lng: data.longitude })
            : [],
        },
      });

      map.addLayer({
        id: "spot-layer",
        source: "spot-data",
        type: "symbol",
        layout: {
          "icon-image": "pin",
          "icon-size": 0.08,
          "icon-padding": 0,
          "icon-allow-overlap": true,
        },
      });
    });

    // Add popup on click
    map.on("click", (e) => {
      if (map.getZoom() < 12) {
        setAlert("Please zoom in more");
      } else {
        setAlert(null);
        dispatch(
          setSpotAction({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })
        );
        map.getSource("spot-data").setData({
          type: "FeatureCollection",
          features: setFeature(e.lngLat),
        });
      }
    });

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
      {alert && <Alert>{alert}</Alert>}
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
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Alert = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 8px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
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
`;

export default PickMap;
