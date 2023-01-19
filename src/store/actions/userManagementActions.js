import {
  ADD_USER,
  DELETE_USER,
  RESET_STATE,
  SET_SELECTED_USER,
  UPDATE_USER,
} from "../types/userManagemenetTypes";

export const addUserAction = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const setSelectedUserAction = (payload) => {
  return {
    type: SET_SELECTED_USER,
    payload,
  };
};

export const updateUserAction = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const deleteUserAction = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const resetStateAction = () => {
  return {
    type: RESET_STATE,
  };
};
