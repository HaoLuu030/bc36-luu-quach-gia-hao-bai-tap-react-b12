import React from "react";
import RegisterForm from "./RegisterForm";
import UserList from "./UserList";

export default function UserManagement() {
  return (
    <div className="w-75 mx-auto mt-5">
      <RegisterForm />
      <UserList />
    </div>
  );
}
