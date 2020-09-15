const SET_SEARCH = "SET_SEARCH";

export const setSearchAction = (data) => ({
  type: SET_SEARCH,
  data,
});

const INITIAL_STATE = {
  term: "",
  coordinates: null,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default searchReducer;
