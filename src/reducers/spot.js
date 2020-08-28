import { getSpot, createSpot, reviewSpot } from "../services/spots";

const SPOT_API_PENDING = "SPOT_API_PENDING";
const SPOT_API_SUCCESS = "SPOT_API_SUCCESS";
const SPOT_API_FAILURE = "SPOT_API_FAILURE";

const spotsApiPending = () => ({
  type: SPOT_API_PENDING,
});

const spotsApiSuccess = (data) => ({
  type: SPOT_API_SUCCESS,
  data,
});

const spotsApiFailure = (error) => ({
  type: SPOT_API_FAILURE,
  error,
});

export const getSpotAction = (spot_id) => async (dispatch) => {
  dispatch(spotsApiPending());
  try {
    const spot = await getSpot(spot_id);
    dispatch(spotsApiSuccess(spot));
  } catch (error) {
    dispatch(spotsApiFailure(error));
  }
};

export const createSpotAction = (spot, history) => async (dispatch) => {
  dispatch(spotsApiPending());
  try {
    const newSpot = await createSpot(spot);
    dispatch(spotsApiSuccess(newSpot));
    history.push(`/spot/${newSpot.properties.spot_id}`);
  } catch (error) {
    dispatch(spotsApiFailure(error));
  }
};

export const reviewSpotAction = (review) => async (dispatch) => {
  dispatch(spotsApiPending());
  try {
    const updatedSpot = await reviewSpot(review);
    dispatch(spotsApiSuccess(updatedSpot));
  } catch (error) {
    dispatch(spotsApiFailure(error));
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
      return { ...state, pending: false, data: null, error: action.error };
    default:
      return state;
  }
};

export default spotsReducer;
