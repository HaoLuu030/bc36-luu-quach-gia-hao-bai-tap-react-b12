import {
  ADD_USER,
  DELETE_USER,
  RESET_STATE,
  SET_SELECTED_USER,
  UPDATE_USER,
} from "../types/userManagemenetTypes";

const DEFAULT_STATE = {
  userList: [],
  selectedUser: null,
  isUpdating: false,
};

export const userManagementReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER: {
      const data = [...state.userList];
      data.push({ ...payload, id: Date.now() });
      state.userList = data;
      alert("User was added");
      break;
    }
    case SET_SELECTED_USER: {
      state.selectedUser = payload;
      state.isUpdating = true;
      break;
    }

    case UPDATE_USER: {
      state.userList = state.userList.map((element) => {
        if (element.id === payload.id) {
          return payload;
        }
        return element;
      });
      state.isUpdating = false;
      state.selectedUser = null;
      alert("User was updated");
      break;
    }
    case DELETE_USER: {
      state.userList = state.userList.filter((element) =>
        element.id === payload.id ? false : true
      );
      alert("User was deleted");
      break;
    }

    case RESET_STATE: {
      state.selectedUser = null;
      state.isUpdating = false;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
