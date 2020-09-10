import { getRandom } from "../services/unsplash";

const PHOTO_API_PENDING = "PHOTO_API_PENDING";
const PHOTO_API_SUCCESS = "PHOTO_API_SUCCESS";
const PHOTO_API_FAILURE = "PHOTO_API_FAILURE";

const spotsApiPending = () => ({
  type: PHOTO_API_PENDING,
});

const spotsApiSuccess = (data) => ({
  type: PHOTO_API_SUCCESS,
  data,
});

const spotsApiFailure = (error) => ({
  type: PHOTO_API_FAILURE,
  error,
});

export const getPhotoAction = () => async (dispatch) => {
  dispatch(spotsApiPending());
  try {
    const data = await getRandom();
    dispatch(spotsApiSuccess(data));
  } catch (error) {
    dispatch(spotsApiFailure(error));
  }
};

const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const photoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHOTO_API_PENDING:
      return { ...state, pending: true };
    case PHOTO_API_SUCCESS:
      return { ...state, pending: false, data: action.data, error: null };
    case PHOTO_API_FAILURE:
      return { ...state, pending: false, data: null, error: action.error };
    default:
      return state;
  }
};

export default photoReducer;
