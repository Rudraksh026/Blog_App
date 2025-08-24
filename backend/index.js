const express = require("express");
const router = require("./auth-router/router");
const cors = require("cors");
const path = require("path")
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const db = require("./database/db");

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use("/",router)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


db().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

