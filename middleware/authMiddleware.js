const jwt = require("jsonwebtoken");
const authMiddleWare = async (req, res, next) => {
  let jwtToken;
  const getAuthToken = req.headers["authorization"];
  if (getAuthToken !== undefined) {
    jwtToken = getAuthToken;
  }
  if (jwtToken === undefined) {
    return res.status(401).send("Invalid JwtToken");
  } else {
    jwt.verify(jwtToken, "Rahul Secret", async (err, result) => {
      if (err) {
        res.status(401).send("Invalid JwtToken");
      } else {
        next();
      }
    });
  }
};

module.exports = authMiddleWare;
