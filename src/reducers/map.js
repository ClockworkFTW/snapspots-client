const SET_MAP_VIEWPORT = "SET_MAP_VIEWPORT";

export const setMapAction = (data) => ({
  type: SET_MAP_VIEWPORT,
  data,
});

const INITIAL_STATE = {
  zoom: 10,
  cLat: null,
  cLng: null,
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAP_VIEWPORT:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default mapReducer;
