const jwt = require("jsonwebtoken");

const algo = "HS256";
module.exports = {
  tokenGenerate: (payload, expiresIn) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: algo,
      expiresIn: "120s",
    });

    return token;
  },

  verifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: algo,
    });
    return decoded;
  },
};
