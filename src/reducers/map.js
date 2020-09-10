const SET_MAP_VIEWPORT = "SET_MAP_VIEWPORT";

export const setMapViewportAction = (viewport) => ({
  type: SET_MAP_VIEWPORT,
  viewport,
});

const INITIAL_STATE = {
  zoom: 10,
  cLat: null,
  cLng: null,
  neLat: null,
  neLng: null,
  swLat: null,
  swLng: null,
  focus: null,
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAP_VIEWPORT:
      return { ...state, ...action.viewport };
    default:
      return state;
  }
};

export default mapReducer;
