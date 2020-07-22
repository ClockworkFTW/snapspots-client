import { createSpot } from "../services/spots";

const SPOTS_API_PENDING = "SPOTS_API_PENDING";
const SPOTS_API_SUCCESS = "SPOTS_API_SUCCESS";
const SPOTS_API_FAILURE = "SPOTS_API_FAILURE";

const spotsApiPending = () => ({
  type: SPOTS_API_PENDING,
});

const spotsApiSuccess = (data) => ({
  type: SPOTS_API_SUCCESS,
  data,
});

const spotsApiFailure = (error) => ({
  type: SPOTS_API_FAILURE,
  error,
});

export const createSpotAction = (spot) => async (dispatch) => {
  dispatch(spotsApiPending());
  try {
    const newSpot = await createSpot(spot);
    dispatch(spotsApiSuccess(newSpot));
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
    case SPOTS_API_PENDING:
      return { ...state, pending: true };
    case SPOTS_API_SUCCESS:
      return { ...state, pending: false, data: action.data, error: null };
    case SPOTS_API_FAILURE:
      return { ...state, pending: false, data: null, error: action.error };
    default:
      return state;
  }
};

export default spotsReducer;
