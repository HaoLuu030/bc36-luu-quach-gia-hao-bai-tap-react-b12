import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";

export default function UserList() {
  const userState = useSelector((state) => state.userManagementReducer);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("All");
  const renderUsers = () => {
    const searchedData = userState.userList
      .filter((element) => {
        return (
          element.fullName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        );
      })
      .filter((element) => {
        if (type === "All") {
          return element;
        }
        return element.type === type;
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
              <option value="All">All</option>
              <option value="Client">Client</option>
              <option value="Admin">Admin</option>
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
