import jwt from "jsonwebtoken";

import { getUser, createUser } from "../services/users";

const jwtSecret = process.env.REACT_APP_JWT_SECRET;
const tokenName = "snapspots_user_token";

const USER_API_PENDING = "USER_API_PENDING";
const USER_API_SUCCESS = "USER_API_SUCCESS";
const USER_API_FAILURE = "USER_API_FAILURE";

const userApiPending = () => ({
  type: USER_API_PENDING,
});

const userApiSuccess = (data) => ({
  type: USER_API_SUCCESS,
  data,
});

const userApiFailure = (error) => ({
  type: USER_API_FAILURE,
  error,
});

export const userInit = () => (dispatch) => {
  const token = localStorage.getItem(tokenName);
  if (token) {
    const user = jwt.verify(token, jwtSecret);
    dispatch(userApiSuccess(user));
  } else {
    dispatch(userApiSuccess(null));
  }
};

export const userSignUp = (credentials) => async (dispatch) => {
  dispatch(userApiPending());
  try {
    const token = await createUser(credentials);
    localStorage.setItem(tokenName, token);
    const user = jwt.verify(token, jwtSecret);
    dispatch(userApiSuccess(user));
  } catch (error) {
    dispatch(userApiFailure(error));
  }
};

export const userSignIn = (credentials) => async (dispatch) => {
  dispatch(userApiPending());
  try {
    const token = await getUser(credentials);
    localStorage.setItem(tokenName, token);
    const user = jwt.verify(token, jwtSecret);
    dispatch(userApiSuccess(user));
  } catch (error) {
    dispatch(userApiFailure(error));
  }
};

export const userSignOut = () => (dispatch) => {
  localStorage.removeItem(tokenName);
  dispatch(userApiSuccess(null));
};

const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_API_PENDING:
      return { ...state, pending: true };
    case USER_API_SUCCESS:
      return { ...state, pending: false, data: action.data, error: null };
    case USER_API_FAILURE:
      return { ...state, pending: false, data: null, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
