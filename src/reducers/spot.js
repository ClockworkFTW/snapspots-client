import { getSpot, createSpot, updateSpot, reviewSpot } from "../services/spots";

const INIT_SPOT = "INIT_SPOT";
const SET_SPOT = "SET_SPOT";

export const initSpotAction = () => ({
  type: INIT_SPOT,
  data: {
    name: "",
    type: [],
    equipment: [],
    description: "",
    photos: [],
    latitude: 10,
    longitude: -30,
  },
});

export const setSpotAction = (data) => ({
  type: SET_SPOT,
  data,
});

const SPOT_API_PENDING = "SPOT_API_PENDING";
const SPOT_API_SUCCESS = "SPOT_API_SUCCESS";
const SPOT_API_FAILURE = "SPOT_API_FAILURE";

const spotApiPending = () => ({
  type: SPOT_API_PENDING,
});

const spotApiSuccess = (data) => ({
  type: SPOT_API_SUCCESS,
  data,
});

const spotApiFailure = (error) => ({
  type: SPOT_API_FAILURE,
  error,
});

export const getSpotAction = (spot_id) => async (dispatch) => {
  dispatch(spotApiPending());
  try {
    const spot = await getSpot(spot_id);
    dispatch(spotApiSuccess(spot));
  } catch (error) {
    dispatch(spotApiFailure(error));
  }
};

export const createSpotAction = (spot, history) => async (dispatch) => {
  dispatch(spotApiPending());
  try {
    const newSpot = await createSpot(spot);
    dispatch(spotApiSuccess(newSpot));
    history.push(`/spot/${newSpot.spot_id}`);
  } catch (error) {
    dispatch(spotApiFailure(error));
  }
};

export const updateSpotAction = (spot, history) => async (dispatch) => {
  dispatch(spotApiPending());
  try {
    const updatedSpot = await updateSpot(spot);
    dispatch(spotApiSuccess(updatedSpot));
    history.push(`/spot/${updatedSpot.spot_id}`);
  } catch (error) {
    dispatch(spotApiFailure(error));
  }
};

export const reviewSpotAction = (review) => async (dispatch) => {
  dispatch(spotApiPending());
  try {
    const updatedSpot = await reviewSpot(review);
    dispatch(spotApiSuccess(updatedSpot));
  } catch (error) {
    dispatch(spotApiFailure(error));
  }
};

const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const spotsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPOT_API_PENDING:
      return { ...state, pending: true };
    case SPOT_API_SUCCESS:
      return { ...state, pending: false, data: action.data, error: null };
    case SPOT_API_FAILURE:
      return { ...state, pending: false, error: action.error };
    case INIT_SPOT:
      return { ...state, pending: false, data: action.data, error: null };
    case SET_SPOT:
      return { ...state, data: { ...state.data, ...action.data } };
    default:
      return state;
  }
};

export default spotsReducer;
