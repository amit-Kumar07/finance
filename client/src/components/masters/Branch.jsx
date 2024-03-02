import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import toast from "react-hot-toast";
const CustomerData = [
  {
    id: 1,
    branchCode: "B001",
    branchName: "Vaishali",
    address: "New Delhi",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 2,
    branchCode: "B002",
    branchName: "Kaushambi",
    address: "New Delhi",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 3,
    branchCode: "B003",
    branchName: "Sector-62",
    address: "Noida",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 4,
    branchCode: "B004",
    branchName: "Adarsh Nagar",
    address: "Delhi",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 5,
    branchCode: "B005",
    branchName: "Model Town",
    address: "Delhi",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
];

const Branch =  () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const [branchCode, setbranchCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setData(CustomerData);
  }, []);


  const handleSave=(e)=>{
   e.preventDefault();
   const dt = [...data];
   const newObject = {
    id: CustomerData.length+1,
    branchCode: branchCode,
    branchName: branchName,
    address: address,
    created: new Date().toLocaleString(),
    updated: new Date().toLocaleString(),
   }
   dt.push(newObject);
   setData(dt);
   toast.success("Saved Branch Successfully");
   setShow(false);
  }

  const handelEdit = (id) => {
    handleShow();
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setIsUpdate(true);
      setId(id);
      setbranchCode(dt[0].branchCode);
      setBranchName(dt[0].branchName);
      setAddress(dt[0].address);
    }
  };

  const handelUpdate = (id) => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data];
    dt[index].branchCode = branchCode;
    dt[index].branchName= branchName;
    dt[index].address= address;
    setData(dt);
    setShow(false);
    toast.success("Update Successfully");
  }


  const handelDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
        console.log(dt);
      }
    }
    toast.success("Deleted Successfully")
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
                  placeholder="Search Branch"
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
              <b>Branch Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>
              Add New Branch
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Branch Code</th>
                  <th>Branch Name </th>
                  <th>Address</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.branchCode} </td>
                      <td>{item.branchName}</td>
                      <td>{item.address}</td>
                      <td>{item.created}</td>
                      <td>{item.updated}</td>
                      <td className="d-flex justify-content-center align-items-center">
                          <a
                          href="#"
                          className="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                        >
                          <i class="material-icons">&#xE417;</i>
                        </a>
                        &nbsp;
                        <a
                          href="#"
                          className="edit"
                          title="Edit"
                          data-toggle="tooltip"
                          onClick={() => handelEdit(item.id)}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </a>
                        &nbsp;
                        <a
                          href="#"
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                          onClick={() => handelDelete(item.id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
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
                !isUpdate ? <Modal.Title>Create Branch</Modal.Title> : <Modal.Title>Update Branch</Modal.Title>
              }
              
              
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="branch_cd" className="form-label">
                      Branch Code<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_c"
                      id="branch_c"
                      placeholder="Enter Branch Code"
                      className="form-control"
                      onChange={(e) => setbranchCode(e.target.value)}
                      value={branchCode}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="branch_name" className="form-label">
                      Branch Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Branch Name"
                      className="form-control"
                      onChange={(e) => setBranchName(e.target.value)}
                      value={branchName}
                    />
                  </div>
                </div>
                
                <div className="row">
                    <div className="col">
                    <label htmlFor="address" className="form-label">
                      Address<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Address"
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    /> 
                  </div> 
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {
                !isUpdate ? <Button variant="success" onClick={(e)=>handleSave(e)}>
                Save Branch
              </Button> : <Button variant="success" onClick={(e)=>handleSave(e)}>
                Update Branch
              </Button>
              }
              
              
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}

export default Branch;
