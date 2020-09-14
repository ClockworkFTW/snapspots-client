const SET_SEARCH = "SET_SEARCH";

export const setSearchAction = (search) => ({
  type: SET_SEARCH,
  search,
});

const INITIAL_STATE = "";

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.search;
    default:
      return state;
  }
};

export default searchReducer;
