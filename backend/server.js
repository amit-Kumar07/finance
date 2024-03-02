const express = require("express");
const app = express();
const dotenv = require("dotenv");

const userRoutes = require("./routes/user")
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 8090;
//Database connect
database.connect();

//middlwares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1/", userRoutes);


//def route
app.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running...'
    });
})


app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})