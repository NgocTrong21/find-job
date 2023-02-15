import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import { userServices } from "../../services";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await userServices.getAllCode("GENDER");
      if (res && res.errorCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const createUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userServices.getPostNewUser(data);
      if (res && res.errorCode === 0) {
        dispatch(createUserSuccess());
        toast.success("Create a new user success!");
      } else {
        dispatch(createUserFailed());
        toast.error(res.message);
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log(e);
    }
  };
};

export const createUserSuccess = () => {
  console.log("Create user success");
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
  };
};

export const createUserFailed = () => {
  console.log("Create user failed");
  return {
    type: actionTypes.CREATE_USER_FAILED,
  };
};
