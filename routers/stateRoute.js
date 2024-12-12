const express = require("express");
const router = express.Router();
const dbConnection = require("../config/db");
const authMiddleWare = require("../middleware/authMiddleware");
router.get("/", authMiddleWare, (req, res) => {
  const getStateDetails = `
        SELECT * FROM
        covidbackend.state
    `;
  dbConnection.query(getStateDetails, (err, result) => {
    if (err) {
      return res.send("Query Error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Item not found");
      } else {
        res.send(result);
      }
    }
  });
});
router.get("/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params;
  const parseId = parseInt(id);
  const getStateDetails = `
        SELECT * FROM
        covidbackend.state
        WHERE state_id = ${parseId}
    `;
  dbConnection.query(getStateDetails, [parseId], (err, result) => {
    if (err) {
      return res.send("Query Error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Item not found");
      } else {
        res.send(result);
      }
    }
  });
});
router.get("/:stateId/stats/", authMiddleWare, (req, res) => {
  console.log("hello");
  const getStateDetails = `
  SELECT count(district.cases) as totalCase, count(district.cured) as totalCured, count(district.active) as totalActive, count(district.deaths) as totalDeaths FROM
  covidbackend.state natural join covidbackend.district
`;
  console.log(getStateDetails, "undefiend");
  dbConnection.query(getStateDetails, (err, result) => {
    if (err) {
      console.log(err, "err");
      return res.send("Query Error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Item not found");
      } else {
        res.send(result);
      }
    }
  });
});
module.exports = router;
