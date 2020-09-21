import { tokenName } from "../reducers/user";

export const setAuthHeader = () => {
  const token = localStorage.getItem(tokenName);
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    return null;
  }
};
