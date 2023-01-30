import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";

export default function UserList() {
  const userState = useSelector((state) => state.userManagementReducer);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("All");
  const renderUsers = () => {
    // a series of search function stringed together, no matters which one comes first
    const searchedData = userState.userList
      .filter((element) => {
        return (
          element.fullName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        );
      })
      .filter((element) => {
        switch (type) {
          case "1": {
            return element.type === "Client";
          }
          case "2": {
            return element.type === "Admin";
          }
          default:
            return element;
        }
      });
    return searchedData.map((element) => {
      return <UserItem key={element.id} user={element} />;
    });
  };
  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };
  const handleFilter = (event) => {
    setType(event.target.value);
  };
  return (
    <div className="card p-0 mt-3">
      <div className="card-header font-weight-bold">USER MANAGEMENT</div>
      <div className="row mt-4 px-3 ">
        <div className="col-4">
          <div className="form-group mb-0">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search by full name..."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-3 ml-auto">
          <div className="form-group mb-0">
            <select onChange={handleFilter} className="form-control">
              <option value="0">All</option>
              <option value="1">Client</option>
              <option value="2">Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}
