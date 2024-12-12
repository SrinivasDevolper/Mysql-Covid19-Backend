const express = require("express");
const dbConnection = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  const getUserDetails = `SELECT * FROM covidbackend.covidUsers
  where username = ?`;
  dbConnection.query(getUserDetails, [username], (err, result) => {
    if (err) {
      return res.send("Query Error");
    } else {
      if (result.length > 0) {
        return res.status(404).send("user already existed");
      } else {
        const postNewUser = `
          INSERT INTO
          covidbackend.covidUsers(username, password)
          values(
            ?, ?
          )
        `;
        dbConnection.query(
          postNewUser,
          [username, bcryptPassword],
          (err, result) => {
            if (err) {
              return res.send("Query Error");
            } else {
              return res.send("user successfully Added");
            }
          }
        );
      }
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const getUserDetails = `
    SELECT * FROM
    covidbackend.covidUsers
    where username = ?
  `;
  dbConnection.query(
    getUserDetails,
    [username, password],
    async (err, result) => {
      if (err) {
        return res.send("Query Error");
      } else {
        if (result.length === 0) {
          return res.status(404).send("Invalid user");
        } else {
          const getValidPassword = await bcrypt.compare(
            password,
            result[0].password
          );
          if (getValidPassword) {
            const payLoad = { username };
            const jwtToken = jwt.sign(payLoad, "Rahul Secret");
            return res.status(200).send(jwtToken);
          } else {
            return res.status(404).send("Invalid password");
          }
        }
      }
    }
  );
});

module.exports = router;
