require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT ||  8000;
const adminRoute = require("./routes/adminLoginRoute");
const projectRouter = require("./routes/projectRoutes");
const Connection = require("./db/Connection");
const contactRoute = require("./routes/contactRoute");
const path = require("path");
const skillRouter = require("./routes/skillRoute");
const expRouter = require("./routes/expRoute");
const eduRouter = require("./routes/eduRoute");
const smProjectRouter = require("./routes/smProjectRoutes");
const cvRouter = require("./routes/cvRoute");

Connection();
const uplaod = path.join(process.cwd(), "uploads")
app.use(express.static(uplaod))
app.use(cors())
app.use(express.json())

// ROUTES
app.use(projectRouter)
app.use(smProjectRouter)
app.use(adminRoute)
app.use(contactRoute);
app.use(skillRouter)
app.use(expRouter)
app.use(eduRouter)
app.use(cvRouter)

app.listen(port, () => {
    console.log(`Server Start on http://localhost:${port}`);
})
