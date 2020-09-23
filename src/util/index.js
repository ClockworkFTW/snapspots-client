import { tokenName } from "../reducers/user";

export const setAuthHeader = () => {
  const token = localStorage.getItem(tokenName);
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    return null;
  }
};

export const setCors = (api) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return `http://localhost:8080/${api}`;
  } else {
    return api;
  }
};
