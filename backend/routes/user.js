const express = require("express");
const router = express.Router();

//signup controller
const {signup, login} = require("../controllers/Auth")

//user controller
const {saveuser, getuser, update, deleteuser } = require("../controllers/User")

//route controller
const {saverole, getrole, updaterole , deleterole} = require("../controllers/Role");

//login route
router.post("/signup", signup);
router.post("/login", login);

//user route
router.post("/saveuser", saveuser);
router.get("/getuser", getuser);
router.patch("/update/:id", update);
router.delete("/delete/:id", deleteuser );


//role route
router.post("/saverole", saverole)
router.get("/getrole", getrole)
router.patch("/update/role/:id", updaterole);
router.delete("/delete/role/:id", deleterole);
module.exports = router;