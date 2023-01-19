import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  resetStateAction,
  updateUserAction,
} from "../store/actions/userManagementActions";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userManagementReducer);

  // form state
  const [formState, setFormState] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "Client",
  });
  // error state to render the error message
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "",
  });
  //get form info as users type in
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  //validation kicks in once user click out of the input
  const handleBlur = (event) => {
    let message = "";
    const { name, validity } = event.target;
    const { valueMissing, patternMismatch } = validity;
    if (valueMissing) {
      message = "Please fill out this field.";
    }
    if (patternMismatch) {
      // handle cases where the inputs are invalid
      switch (name) {
        case "username":
          message =
            "User name must be at least 4 characters long and only contain alphanumerics, start with a capital letter, and contain at least 1 number (E.g. Peter_1234)";
          break;
        case "fullName":
          message =
            "Full name must be at least 4 characters long and does not accept special character (E.g. Peter Pan)";
          break;
        case "password":
          message =
            "Password must be at least 8 characters long and must contain at least 1 letter, 1 number, and 1 special character (E.g. PeterPan1234@)";
          break;
        case "phoneNumber":
          message =
            'Phone number must start with "03", "05", "07", "08", "09", or "012", and must be 10 or 11 characters long (E.g. 0908567123)';
          break;
        case "email":
          message = "Invalid email format";
          break;

        default:
          break;
      }
    }
    setErrorMessage({
      ...errorMessage,
      [name]: message,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    if (!isValid) {
      return;
    }
    if (!userState.isUpdating) {
      dispatch(addUserAction(formState));
    } else {
      dispatch(updateUserAction(formState));
    }

    handleReset();
  };
  //reset form
  const handleReset = () => {
    document.getElementById("registration-form").reset();
    setFormState({
      username: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "Client",
    });
    setErrorMessage({
      username: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "",
    });
    dispatch(resetStateAction());
  };
  //set the formstate again when the form receives the props from store to update users
  useEffect(() => {
    if (!userState.selectedUser) {
      return;
    }
    setFormState({ ...userState.selectedUser });
  }, [userState.selectedUser]);
  //this will run every time the input is updated to see if there's any input error. If not, enable the button
  useEffect(() => {
    const form = document.getElementById("registration-form");
    const buttonSave = document.getElementById("button-save");
    buttonSave.disabled = !form.checkValidity();
  }, [formState]);
  //deconstruct the state to set the values to the inputs with the variables we just got
  const { username, fullName, password, phoneNumber, email, type } = formState;
  return (
    <div className="card p-0">
      <div className="card-header bg-warning text-white font-weight-bold">
        REGISTER FORM
      </div>
      <div className="card-body">
        <form
          id="registration-form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          noValidate
        >
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Username</label>
                <input
                  value={username}
                  onBlur={(event) => {
                    handleBlur(event);
                  }}
                  required
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  pattern="^(?=.*[A-Z]+)(?=.*\d+)[A-Za-z0-9_]{4,}$"
                  name="username"
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{errorMessage.username}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={fullName}
                  onBlur={(event) => {
                    handleBlur(event);
                  }}
                  required
                  pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{4,}$"
                  name="fullName"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{errorMessage.fullName}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  value={password}
                  onBlur={(event) => {
                    handleBlur(event);
                  }}
                  required
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  name="password"
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{errorMessage.password}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  value={phoneNumber}
                  onBlur={(event) => {
                    handleBlur(event);
                  }}
                  required
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  pattern="^(03|05|07|08|09|012)\d{7,8}$"
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{errorMessage.phoneNumber}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  value={email}
                  onBlur={(event) => {
                    handleBlur(event);
                  }}
                  required
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  name="email"
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{errorMessage.email}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={type}
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  name="type"
                  className="form-control"
                >
                  <option>Client</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button
              disabled
              id="button-save"
              type="submit"
              className="btn btn-warning mr-2"
            >
              SAVE
            </button>
            <button
              onClick={() => {
                if (window.confirm("Do you want to reset the form?")) {
                  handleReset();
                }
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
