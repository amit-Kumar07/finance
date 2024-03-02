
import React, { useState, useEffect } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import toast from "react-hot-toast";

const CustomerData = [
  {
    id: 1,
    customerName: "Ashish",
    phoneNo: "8967452345",
    vehicleRegNo: "UP14DL3030",
    incCompany: "Tata Capital",
    expiryDate: "05/05/2025",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 2,
    customerName: "Abhishek",
    phoneNo: "8967452345",
    vehicleRegNo: "UP14DL3030",
    incCompany: "Tata Capital",
    expiryDate: "05/05/2025",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 3,
    customerName: "Santosh",
    phoneNo: "8967452345",
    vehicleRegNo: "UP14DL3030",
    incCompany: "Baja",
    expiryDate: "05/05/2025",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 4,
    customerName: "Prince",
    phoneNo: "8967452345",
    vehicleRegNo: "UP14DL3030",
    incCompany: "Future",
    expiryDate: "05/05/2025",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
  {
    id: 5,
    customerName: "Raj",
    phoneNo: "8967452345",
    vehicleRegNo: "UP14DL3030",
    incCompany: "Tata",
    expiryDate: "05/05/2025",
    created: "02/02/2024 6:55pm",
    updated: "02/02/2024 6:55pm",
  },
];

const FormData = () => {
  const [formData, setFormData] = useState({
    serialno: "",
    CollectionDate: "",
    customer_name: "",
    company_name: "",
    dob: "",
    pan: "",
    phoneNumber: "",
    aadhar: "",
    address: "",
    branch_name: "",
    email: "",
    Manufacturing_year: "",
    model: "",
    fuel: "",
    cc: "",
    Vechile_reg_no: "",
    Insurance_comp: "",
    current_policy_no: "",
    date:"",
    expiry_month: "",
    expiry_year: "",
    risk_start_date: "",
    amount_paid: "",
    cheque_no: "",
    bank_name: "",
    shortfall_amt: "",
    shortfall_cheq: "",
    receipt_no: "",
    total_gross_amt: "",
    idv: "",
    ncb: "",
    Plans: "",
    third_party_premium: "",
    net_premium: "",
    od_premium: "",
    remakrs_by_caller: "",
    referred_by: "",
    referred_num: "",
    code: "",
    tc_name: "",
  });
  const [data, setData] = useState([]);
  
  const [id, setId] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [vehicleRegNo, setVechileRegNo] = useState("");
  const [incCompany, setInsuranceComp ]= useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setData(CustomerData);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // const dt = [...data];
    // const newObject = {
    //   id: CustomerData.length + 1,
    //   branchCode: branchCode,
    //   branchName: branchName,
    //   address: address,
    //   created: new Date().toLocaleString(),
    //   updated: new Date().toLocaleString(),
    // };
    // dt.push(newObject);
    // setData(dt);
    // toast.success("Saved Branch Successfully");
    // setShow(false);
  };
  const handelEdit = (id) => {
    setIsUpdate(true)
    handleShow()
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setId(id);
      setCustomerName(dt[0].customerName);
      setPhoneNo(dt[0].phoneNo);
      setVechileRegNo(dt[0].vehicleRegNo);
      setInsuranceComp(dt[0].incCompany);
    }
  };
  const handelUpdate = (id) => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data];
    dt[index]. customerName =  customerName;
    dt[index].phoneNo = phoneNo;
    dt[index].vehicleRegNo = vehicleRegNo;
    dt[index].incCompany =incCompany;
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
    toast.success("Deleted Successfully");
  };

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("finally printing the form of data");
    console.log(formData);
  }

 

  return (
    <div className="container border shadow rounded p-4  formData mt-3">
      <div className="row">
        <div className="col-sm-3 mt-5 mb-4 text-gred">
          <div className="search">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Data Entry"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        <div
          className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
          style={{ color: "green" }}
        >
          <p>
            <b>Data Entry Details</b>
          </p>
        </div>
        <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
          <Button variant="primary" onClick={handleShow}>
            Add New Data 
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered text-center ">
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Customer Name</th>
                <th>Phone no</th>
                <th>Vehicle reg no</th>
                <th>Inc.Company</th>
                <th>Expiary Date</th>
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
                    <td>{item.customerName} </td>
                    <td>{item.phoneNo}</td>
                    <td>{item.vehicleRegNo}</td>
                    <td>{item.incCompany}</td>
                    <td>{item.expiryDate}</td>
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
      <div className="row">
        <div className="col-sm-6 mt-3 col-md-4">
          {/* Model Box  */}


       {
        !isUpdate ? <div className="model_box">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >

          <Modal.Header closeButton className="container-xl">
            <Modal.Title>Create new data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col">
                  <label htmlFor="serialno" className="form-label">
                    Serial Number<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    name="serialno"
                    id="serialno"
                    placeholder="Serial Id"
                    className="form-control"
                    value={formData.serialno}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="CollectionDate" className="form-label">
                    Collection Date<sup>*</sup>
                  </label>
                  <input
                    type="date"
                    name="CollectionDate"
                    id="CollectionDate"
                    className="form-control"
                    value={formData.CollectionDate}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="customer_name" className="form-label">
                    Customer Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Customer Name"
                    name="customer_name"
                    id="customer_name"
                    className="form-control"
                    value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="company_name" className="form-label">
                    Company Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Name"
                    name="company_name"
                    id="company_name"
                    value={formData.company_name}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="dob" className="form-label">
                    D.O.B
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Date of Birth"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="pan" className="form-label">
                    PAN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pan No."
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="aadhar" className="form-label">
                    Aadhar No
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Aadhar no."
                    className="form-control"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="address" className="form-label">
                    Address<sup>*</sup>
                  </label>
                  <textarea
                    type="date"
                    className="form-control"
                    placeholder="Enter Address...."
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone No.<sup>*</sup>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="+91-1234567899"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="tel" className="form-label">
                    Tel No.
                  </label>
                  <input
                    type="tel"
                    name="CollectionDate"
                    id="CollectionDate"
                    className="form-control"
                    value={formData.CollectionDate}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mt-2">
                  <label htmlFor="branch_name" className="form-label">
                    Branch Name<sup>*</sup>
                  </label>
                  {/* <select
                    className="form-select"
                    id="branch_name"
                    name="branch_name"
                    value={formData.branch_name}
                    onChange={changeHandler}
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="Noida">Noida</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Guargaon">Guargaon</option>
                  </select> */}
                  <input
                    type="text"
                    id="branch_name"
                    name="branch_name"
                    value={formData.branch_name}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col mt-2">
                  <label htmlFor="tc_name" className="form-label">
                    TC Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="tc_name"
                    name="tc_name"
                    value={formData.tc_name}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
              <div className="col mt-3">
                  <fieldset className="col mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Renewal/Fresh
                    </legend>
                    <div className="col-sm-10 d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gridRadios1"
                          name="gridRadios1"
                          value="R"
                          onChange={changeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios1"
                        >
                          R
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gridRadios1"
                          id="gridRadios1"
                          value="F"
                          onChange={changeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios1"
                        >
                          F
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="col mt-1">
                  <label htmlFor="email" className="form-label">
                    Email<sup>*</sup>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter Email Id"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label
                    htmlFor="Manufacturing_year"
                    className="form-label"
                  >
                    Manufacturing Year<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="Manufacturing_year"
                    name="Manufacturing_year"
                    value={formData.Manufacturing_year}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="model" className="form-label">
                    Model/fuel/cc<sup>*</sup>
                  </label>

                  <div class="input-group">
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Model"
                    />

                    <select
                      className="form-select"
                      id="fuel"
                      name="fuel"
                      value={formData.fuel}
                      onChange={changeHandler}
                      aria-label="Default select example"
                    >
                      <option selected> Select fuel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                    </select>
                    <input
                      type="text"
                      id="cc"
                      name="cc"
                      value={formData.cc}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="cc"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="Vechile_reg_no" className="form-label">
                    Vehicle Reg. No.<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="Vechile_reg_no"
                    name="Vechile_reg_no"
                    value={formData.Vechile_reg_no}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter Vehicle Registration No."
                  />
                </div>
                <div className="col">
                  <label htmlFor="Insurance_comp" className="form-label">
                    Insurance Company<sup>*</sup>
                  </label>
                  <select
                    className="form-select"
                    id="Insurance_comp"
                    name="Insurance_comp"
                    value={formData.Insurance_comp}
                    onChange={changeHandler}
                    aria-label="Default select example"
                  >
                    <option selected>Select Insurace Company Name</option>
                    <option value="TATA AIG">TATA AIG</option>
                    <option value="ICICI LOMBARD ">ICICI LOMBARD </option>
                    <option value="HDFC ERGO">HDFC ERGO</option>
                    <option value="RELIANCE">RELIANCE</option>
                    <option value="LIBERTY">LIBERTY</option>
                    <option value="FUTURE">FUTURE</option>
                    <option value="KOTAK MAHINDRA">KOTAK MAHINDRA</option>
                    <option value="GO DIGIT">GO DIGIT</option>
                    <option value="SBI">SBI</option>
                    <option value="ROYAL SUNDARAM ">ROYAL SUNDARAM </option>
                    <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="current_policy_no" className="form-label">
                    Current Policy No.<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="current_policy_no"
                    name="current_policy_no"
                    value={formData.current_policy_no}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter Policy Number"
                  />
                </div>
                <div className="col">
                  <label htmlFor="combinedInput" className="form-label">
                    Expiry Date:
                  </label>
                
                    <input 
                     type='number'
                     id="date"
                     name="date"
                     value={formData.date}
                     onChange={changeHandler}
                     className="form-control"
                    />
                 
                </div>
    
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="expiry_month" className="form-label">
                    Expiry Month<sup>*</sup>
                  </label>
                  <select
                    className="form-select"
                    id="expiry_month"
                    name="expiry_month"
                    value={formData.expiry_month}
                    onChange={changeHandler}
                    aria-label="Default select example"
                  >
                    <option selected>Select Expiry Month</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="expiry_year" className="form-label">
                    Expiry Year<sup>*</sup>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="expiry_year"
                    name="expiry_year"
                    value={formData.expiry_year}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="risk_start_date" className="form-label">
                    Risk Start Date<sup>*</sup>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="risk_start_date"
                    name="risk_start_date"
                    value={formData.risk_start_date}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col">
                  <label htmlFor="payment_mode" className="form-label">
                    Payment Mode<sup>*</sup>
                  </label>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id="payment_mode"
                      name="payment_mode"
                      value="online"
                      type="radio"
                      onChange={changeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="payment_mode"
                    >
                      Online
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_mode"
                      id="payment_mode"
                      value="Cheque"
                      onChange={changeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="payment_mode"
                    >
                      Cheque
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col">
                  <label htmlFor="amount_paid" className="form-label">
                    Amount Paid By Customer<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount_paid"
                    value={formData.amount_paid}
                    name="amount_paid"
                    onChange={changeHandler}
                    placeholder="Enter Amount.."
                  />
                </div>
                <div className="col">
                  <label htmlFor="cheque_no" className="form-label">
                    Cheque No.<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Cheque no."
                    id="cheque_no"
                    name="cheque_no"
                    value={formData.cheque_no}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="bank_name" className="form-label">
                    Bank Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="bank_name"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter Bank Name.."
                  />
                </div>
                <div className="col">
                  <label htmlFor="shortfall_amt" className="form-label">
                    Shortfall Amount<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Shortfall Amount.."
                    id="shortfall_amt"
                    name="shortfall_amt"
                    value={formData.shortfall_amt}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
               
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="shortfall_cheq" className="form-label">
                    Shortfall Chq No./Recepit No.<sup>*</sup>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      id="shortfall_cheq"
                      name="shortfall_cheq"
                      value={formData.shortfall_cheq}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Shortfall Cheque"
                    />
                    <input
                      type="number"
                      id="receipt_no"
                      name="receipt_no"
                      value={formData.receipt_no}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Receipt No.."
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="total_gross_amt" className="form-label">
                    Total Gross Premium<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="total_gross_amt"
                    name="total_gross_amt"
                    value={formData.total_gross_amt}
                    onChange={changeHandler}
                    placeholder="Enter Gross Premium Amount.."
                    className="form-control"
                  />
                </div>
               
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="idv" className="form-label">
                    IDV<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="idv"
                    name="idv"
                    value={formData.idv}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="" className="form-label">
                    IDV CNG/ELEC/NON-ELEC<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control"
                  />
                </div>
              
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="ncb" className="form-label">
                    NCB<sup>*</sup>
                  </label>
                  <select
                    id="ncb"
                    name="ncb"
                    value={formData.ncb}
                    onChange={changeHandler}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="0">0</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="35">35</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="65">65</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="Plans" className="form-label">
                    Plans<sup>*</sup>
                  </label>
                  <select
                    className="form-select"
                    id="Plans"
                    name="Plans"
                    value={formData.Plans}
                    onChange={changeHandler}
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="d">d</option>
                    <option value="c">c</option>
                    <option value="e">e</option>
                    <option value="t">t</option>
                    <option value="r">r</option>
                    <option value="k">k</option>
                    <option value="pb">pb</option>
                    <option value="eth">eth</option>
                    <option value="ncb">ncb</option>
                    <option value="rsa">rsa</option>
                    <option value="owner">owner</option>
                    <option value="driver">driver</option>
                    <option value="passenger">passenger</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label
                    htmlFor="third_party_premium"
                    className="form-label"
                  >
                    Third Party Premium<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="third_party_premium"
                    value={formData.third_party_premium}
                    name="third_party_premium"
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="net_premium" className="form-label">
                    Net Premium<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="net_premium"
                    name="net_premium"
                    value={formData.net_premium}
                    onChange={changeHandler}
                    placeholder="Enter Net Premium Amount.."
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="od_premium" className="form-label">
                    OD Premium<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    id="od_premium"
                    name="od_premium"
                    value={formData.od_premium}
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor="
                    remakrs_by_caller"
                    className="form-label"
                  >
                    Special Remarks By Caller<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="remakrs_by_caller"
                    name="remakrs_by_caller"
                    value={formData.remakrs_by_caller}
                    onChange={changeHandler}
                    placeholder="Enter 
                        comment..."
                    className="form-control"
                  />
                </div>
               
              </div>
              <div className="row mt-2">
              <div className="col">
                  <label htmlFor="referred_by" className="form-label">
                    Referred By<sup>*</sup>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="referred_by"
                      name="referred_by"
                      value={formData.referred_by}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Enter Name"
                    />
                    <input
                      type="tel"
                      id="referred_num"
                      name="referred_num"
                      value={formData.referred_num}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Phone Number.."
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="code" className="form-label">
                    Code<sup>*</sup>
                  </label>
                  <select
                    className="form-select"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={changeHandler}
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="RG">RG</option>
                    <option value="JK">JK</option>
                    <option value="PC">PC</option>
                    <option value="JY">JY</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-success mb-4 mt-4">
                Submit
              </button>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={(e) => handleSave(e)}>
              Save Data
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Model Box Finsihs */}
      </div> : <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Data</Modal.Title> 
             
              
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                <div className="col">
                    <label htmlFor="role" className="form-label">
                      Customer Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Customer Name"
                      className="form-control"
                       onChange={(e) => setCustomerName(e.target.value)}
                       value={customerName}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="branch_name" className="form-label">
                    Phone No.<sup>*</sup>
                    </label>
                    <input
                      type="number"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Description.."
                      className="form-control"
                      onChange={(e) => setPhoneNo(e.target.value)}
                      value={phoneNo}
                    />
                  </div>
                </div>
                <div className="row">
                <div className="col mt-2">
                    <label htmlFor="role" className="form-label">
                      Vechile Reg. No.<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Vechile Reg. no...."
                      className="form-control"
                      onChange={(e) => setVechileRegNo(e.target.value)}
                      value={vehicleRegNo}
                    />
                  </div>
                  <div className="col mt-2">
                    <label htmlFor="branch_name" className="form-label">
                    Insurance Company<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Insurance comp. name.."
                      className="form-control"
                      onChange={(e) => setInsuranceComp(e.target.value)}
                      value={incCompany}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

               <Button variant="success" onClick={()=>handelUpdate(id)}>
                Update data
              </Button> 
            
              
              
              
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
       }
          
        </div>
      </div>
    </div>
  );
};

export default FormData;

