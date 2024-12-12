const express = require("express");
const app = express();
const dbConnection = require("./config/db.js");
const getRouter = require("./routers/authRoute.js");
const getState = require("./routers/stateRoute.js");
const getDistrict = require("./routers/districtRoute.js");
app.use(express.json());
app.use("/", getRouter);
app.use("/states", getState);
app.use("/district", getDistrict);
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is Running", PORT);
});
