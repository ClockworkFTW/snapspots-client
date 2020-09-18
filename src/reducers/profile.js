import { getProfile } from "../services/profile";

const PROFILE_API_PENDING = "PROFILE_API_PENDING";
const PROFILE_API_SUCCESS = "PROFILE_API_SUCCESS";
const PROFILE_API_FAILURE = "PROFILE_API_FAILURE";

const profileApiPending = () => ({
  type: PROFILE_API_PENDING,
});

const profileApiSuccess = (data) => ({
  type: PROFILE_API_SUCCESS,
  data,
});

const profileApiFailure = (error) => ({
  type: PROFILE_API_FAILURE,
  error,
});

export const getProfileAction = (account_id) => async (dispatch) => {
  dispatch(profileApiPending());
  try {
    const profile = await getProfile(account_id);
    dispatch(profileApiSuccess(profile));
  } catch (error) {
    dispatch(profileApiFailure(error));
  }
};

const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_API_PENDING:
      return { ...state, pending: true };
    case PROFILE_API_SUCCESS:
      return { ...state, pending: false, data: action.data, error: null };
    case PROFILE_API_FAILURE:
      return { ...state, pending: false, data: null, error: action.error };
    default:
      return state;
  }
};

export default profileReducer;
