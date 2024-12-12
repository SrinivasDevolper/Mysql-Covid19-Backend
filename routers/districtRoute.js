const express = require("express");
const router = express.Router();
const dbConnection = require("../config/db");
const authMiddleWare = require("../middleware/authMiddleware");
router.post("/", authMiddleWare, (req, res) => {
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const postDataObject = `
        INSERT INTO 
        covidbackend.district(district_name, state_id, cases, cured, active, deaths)
        values(?, ?, ?, ?, ?, ?)
    `;
  dbConnection.query(
    postDataObject,
    [districtName, stateId, cases, cured, active, deaths],
    async (err, result) => {
      if (err) {
        return res.send("Query Error");
      } else {
        res.status(200).send("District Successfully Added");
      }
    }
  );
});

router.get("/:districtId", authMiddleWare, (req, res) => {
  const { districtId } = req.params;
  const parsedistrictId = parseInt(districtId);
  const getDistrictItem = `
          SELECT * FROM
          covidbackend.district
          WHERE district_id = ?
      `;
  dbConnection.query(getDistrictItem, [parsedistrictId], (err, result) => {
    if (err) {
      console.log(err, "err");
      return res.send("Query Error");
    } else {
      return res.status(404).send(result);
    }
  });
});

router.delete("/:districtId", authMiddleWare, (req, res) => {
  const { districtId } = req.params;
  const parse_districtId = parseInt(districtId);
  const deleteDistrictItem = `
        DELETE FROM covidbackend.district
        WHERE district_id = ?
    `;
  dbConnection.query(deleteDistrictItem, [parse_districtId], (err, result) => {
    if (err) {
      return res.send("Query Error");
    } else {
      res.send("District Removed");
    }
  });
});

router.put("/:districtId", authMiddleWare, (req, res) => {
  const { districtId } = req.params;
  const parse_districtId = parseInt(districtId);
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  const updateDistrictId = `
    UPDATE covidbackend.district
    SET district_name = ?, state_id = ?, cases = ?, cured = ?, active = ?, deaths = ?
    WHERE district_id = ?
  `;
  dbConnection.query(
    updateDistrictId,
    [districtName, stateId, cases, cured, active, deaths, parse_districtId],
    (err, result) => {
      if (err) {
        return res.send("Query Error");
      } else {
        return res.status(200).send("District Details Updated");
      }
    }
  );
});

module.exports = router;
