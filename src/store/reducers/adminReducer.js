import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  genders: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = state;
      copyState.genders = action.data;
      state.isLoading = false;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      console.log("fetch gender failed");
      state.isLoading = false;
      state.genders = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
