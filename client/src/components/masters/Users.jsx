
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { GiSightDisabled } from "react-icons/gi";
import axios from "axios";

const Users = () => {
  
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [show, setShow] = useState(false);
  const [enabledRows, setEnabledRows] = useState([]);

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    repassword: "",
    phone: "",
    role: "",
    branch: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/getuser`) // Endpoint to fetch all users
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleClose = () => {
    setShow(false);
    resetFormData();
  };

  const handleShow = () => {
    setShow(true);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      repassword: "",
      phone: "",
      role: "",
      branch: "",
    });
  };

  const handleSave = () => {
    axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/saveuser`, formData)
      .then((response) => {
        const newUser = response.data;
        setUsers([...users, newUser]);
        toast.success("User added successfully");
        setShow(false);
        resetFormData();
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast.error("Failed to add user");
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleView = (user) => {
    handleShow();
    setFormData(user);
    setEditMode(false);
    setIsReadOnly(true);
  };

  const handelEdit = (user) => {
    handleShow();
    setFormData(user);
    setEditMode(true);
    setSelectedUser(user);
    setIsReadOnly(false);
  };

  const handelDelete = async (user) => {
    setSelectedUser(user);
    if (window.confirm("Are you sure to delete this item?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/delete/${selectedUser._id}`);
        const updatedUsers = users.filter((user) => user._id !== selectedUser._id );
        setUsers(updatedUsers);
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handelUpdate = async () => {
    await axios
      .patch(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/update/${selectedUser._id}`, formData)
      .then((response) => {
        const updatedUser = response.data;
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id ? updatedUser : user
        );
        setUsers(updatedUsers);
        toast.success("User updated successfully");
        setShow(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
      });
  };

  const toggleUserActions = (id) => {
    if (enabledRows.includes(id)) {
      setEnabledRows(enabledRows.filter((rowId) => rowId !== id));
    } else {
      setEnabledRows([...enabledRows, id]);
    }
  };

  return (
    <div className="border container">
      <div className="shadow-lg p-2 mb-5 mt-3 border rounded">
        <div className="row">
          <div className="col-md-2 mt-5 mb-4">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search User"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="col-md-3 offset-md-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
            <h2><b>User Details</b></h2>
          </div>
          <div className="col-md-3 offset-md-1 mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>Add New User</Button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th>Sl.</th>
                    <th>First Name</th>
                    <th>Last Name </th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Branch</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Enabled/Disabled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.userName}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td>{item.branch}</td>
                      <td>{item.created}</td>
                      <td>{item.updated}</td>
                      <td>
                        <Button
                          variant={enabledRows.includes(item._id) ? "danger" : "success"}
                          onClick={() => toggleUserActions(item._id)}
                        >
                          {enabledRows.includes(item._id) ? "Disabled" : "Enabled"}
                        </Button>
                      </td>
                      <td className="d-flex">
                        {!enabledRows.includes(item._id) ? (
                          <>
                            <Link
                              to="#"
                              className="view"
                              title="View"
                              data-toggle="tooltip"
                              style={{ color: "#10ab80" }}
                              onClick={() => handleView(item)}
                            >
                              <i className="material-icons">&#xE417;</i>
                            </Link>
                            <Link
                              to="#"
                              className="edit"
                              title="Edit"
                              data-toggle="tooltip"
                              onClick={() => handelEdit(item)}
                            >
                              <i className="material-icons">&#xE254;</i>
                            </Link>
                            <Link
                              to="#"
                              className="delete"
                              title="Delete"
                              data-toggle="tooltip"
                              style={{ color: "red" }}
                              onClick={() => handelDelete(item)}
                            >
                              <i className="material-icons">&#xE872;</i>
                            </Link>
                          </>
                        ) : (
                          <GiSightDisabled style={{ color: "gray" }} size={30} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="modal"
          >
            <Modal.Header closeButton>
              {!isUpdate ? (
                <Modal.Title>Create User</Modal.Title>
              ) : (
                <Modal.Title>Edit User</Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter First Name"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.firstName}
                      readOnly={isReadOnly}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Last Name"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.lastName}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="role" className="form-label">
                      Role<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      name="role"
                      id="role"
                      aria-label="Default select example"
                      onChange={handleInputChange}
                      value={formData.role}
                      disabled={isReadOnly}
                    >
                      <option disabled={!isReadOnly} selected={!isReadOnly}>
                        {" "}
                        Select Role
                      </option>
                      <option value="Administration">Administration</option>
                      <option value="Sales">Sales</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label">
                      Branch<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      name="branch"
                      id="branch"
                      aria-label="Default select example"
                      onChange={handleInputChange}
                      value={formData.branch}
                      disabled={isReadOnly}
                    >
                      <option disabled={!isReadOnly} selected={!isReadOnly}>
                        {" "}
                        Select Branch
                      </option>
                      <option value="Noida">Noida</option>
                      <option value="Vaishali">Vaishali</option>
                      <option value="Vashundhra">Vashundhra</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="9134567899"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.phone}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userName" className="form-label">
                      Username<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="userName"
                      id="userName"
                      placeholder="Enter Username"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.userName}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
                {!isReadOnly && (
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password<sup>*</sup>
                      </label>
                      <input
                        type={isReadOnly ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="form-control"
                        onChange={handleInputChange}
                        value={formData.password}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="confmPassword" className="form-label">
                        Confirm Password<sup>*</sup>
                      </label>
                      <input
                        type={isReadOnly ? "text" : "password"}
                        name="repassword"
                        id="repassword"
                        placeholder="Confirm Password"
                        className="form-control"
                        onChange={handleInputChange}
                        value={formData.repassword}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                )}
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              {!isReadOnly && (
                <>
                  {!editMode ? (
                    <Button variant="success" onClick={handleSave}>Save User</Button>
                  ) : (
                    <Button variant="success" onClick={handelUpdate}>Update</Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Users;
