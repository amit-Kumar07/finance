import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const Role =  () => {
  
  const [isUpdate, setIsUpdate] = useState(false);
  const formRef = useRef(null);
/////////////////////////////////////
const [roles, setRoles] = useState([]);
const [formData, setFormData] = useState({
  roleName: "",
  description:""
});
const [editMode, setEditMode] = useState(false);
const [selectedRole, setSelectedRole] = useState(null);
const [isReadOnly, setIsReadOnly] = useState(false);
///////////////////////////////////////////////////////

  const [show, setShow] = useState(false);

  const handleClose = () =>  {
    setShow(false);
    resetRole()
  }
  const handleShow = () =>{
    setShow(true);
    resetRole()
  } 

  

  const resetRole = ()=>{
    setRoles([])
  }

  //create role

const handleSave =  () =>{
     axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/saverole`, formData)
    .then((response) => {
      const newRole = response.data;
      setRoles([...roles, newRole]);
      toast.success("Saved Role Successfully");
      setShow(false);
      resetRole();
      formRef.current.reset();
    })
    .catch((error) => {
      console.error("Error adding role:", error);
      toast.error("Failed to add role");
    });
  }

useEffect(()=>{
  fetchRole();
})

const fetchRole = async() =>{
    await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/getrole`)
    .then((res)=>{
      setRoles(res.data);
    })
   .catch((error)=>{
    console.error("Error fetching role", error);
   })

}
  const handelInputChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
   };


   const handleView = (role)=>{
    handleShow();
    setEditMode(false);
    setFormData(role);
    setIsReadOnly(true);
   }
  const handelEdit = (role) => {
    handleShow();
    setFormData(role);
    setEditMode(true);
    setSelectedRole(role);
    setIsReadOnly(false)
  };

  const handelUpdate = async() => {
   await axios.patch(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/update/role/${selectedRole._id}`, formData)
   .then((res)=>{
    const updateRole = res.data;
    const updateRoles = roles.map((role)=>
      role._id === selectedRole._id ? updateRole : role
    );
    setRoles(updateRoles);
    toast.success("Role Updated successfully");
    setShow(false)
   })
   .catch((error) => {
    console.error("Error  updating in role ", error);
    toast.error("Failed to update role")
   })
  }

  const handelDelete = async(role) => {
    setSelectedRole(role)
      if (window.confirm("Are you sure to delete this item?")) {
        try{
          await axios.delete(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/delete/role/${selectedRole._id}`);
          const updateRole = roles.filter((role) => role._id !== selectedRole._id);
          setRoles(updateRole);
          toast.success("Role deleted successfully")
        }catch(error){
          console.error("Error deleting role:", error);
          toast.error("Failed to delete role");
        }
      }
  
  };
  return (
    <div className="container">
      <div className="crud shadow-lg border mb-5 mt-3 p-4 rounded ">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Role.."
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Role Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>
              Add New Role
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Role Name</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.roleName} </td>
                      <td>{item.description}</td>
                      <td>{item.created}</td>
                      <td>{item.updated}</td>
                      <td className="d-flex justify-content-center align-items-center">
                          <Link
                          to="#"
                          className="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                          onClick={() => handleView(item)}
                        >
                          <i class="material-icons">&#xE417;</i>
                        </Link>
                        &nbsp;
                        <Link
                          to="#"
                          className="edit"
                          title="Edit"
                          data-toggle="tooltip"
                          onClick={() => handelEdit(item)}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        &nbsp;
                        <Link
                          href="#"
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                          onClick={() => handelDelete(item)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </Link>
                      </td>
                    </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              {
                !isUpdate ? <Modal.Title>Create Role</Modal.Title> : <Modal.Title>Edit Role</Modal.Title>
              }
              
            </Modal.Header>
            <Modal.Body>
              <form 
                ref={formRef}
                onSubmit={(e)=>{
                e.preventDefault();
                handleSave();
              }}>
                <div className="row">
                <div className="col">
                    <label htmlFor="roleName" className="form-label">
                      Role Name<sup>*</sup>
                    </label>
                    <select
                     
                      className="form-select"
                      name="roleName"
                      id="roleName"
                      aria-label="Default select example"
                      onChange={handelInputChange}
                      value={formData.roleName}
                      disabled={isReadOnly}
                    >
                      <option selected={!isReadOnly}> Select Role</option>
                      <option value="Administration">Administration</option>
                      <option value="Sales">Sales</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="form-label">
                    Description<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter Description.."
                      className="form-control"
                      onChange={handelInputChange}
                      value={formData.description}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              { !isReadOnly && (
                <>
                {
                  !editMode ? <Button variant="success" onClick={handleSave}>
                  Save Role
                </Button> : <Button variant="success" onClick={handelUpdate}>
                  Update Role
                </Button>
                }
                </>  
              ) 
              }
                 
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}

export default Role;
