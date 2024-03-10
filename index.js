require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
const ConnDB = require("./db/ConnDB");
const app = express();

const port = process.env.PORT || 8000;



ConnDB();

app.use(express.json());
app.use(cors());

// ROUTER
app.use("/", router)

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})