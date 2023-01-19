import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserAction,
  setSelectedUserAction,
} from "../store/actions/userManagementActions";

export default function UserItem(props) {
  const dispatch = useDispatch();
  const { id, username, fullName, email, phoneNumber, type } = props.user;
  const handleSetUser = (user) => {
    dispatch(setSelectedUserAction(user));
  };
  const handleDelete = (user) => {
    dispatch(deleteUserAction(user));
  };
  return (
    <tr className="bg-light">
      <td>{id}</td>
      <td>{username}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{type}</td>
      <td>
        <button
          onClick={() => {
            handleSetUser(props.user);
          }}
          className="btn btn-info mr-2"
        >
          EDIT
        </button>
        <button
          onClick={() => {
            handleDelete(props.user);
          }}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </td>
    </tr>
  );
}
