const bcrypt = require("./bcyrpt.js");
const logger = require("./logger.js").getLogger();
const publisher = require("./pub-sub.js");

module.exports = {
  bcrypt,
  logger,
  publisher,
  verifyToken: (givenTimestamp, expiryThreshold) => {
    const currentTimestamp = Date.now();
    const givenTimestampMillis = new Date(givenTimestamp).getTime();
    const difference = currentTimestamp - givenTimestampMillis;

    return difference >= expiryThreshold;
  },
};
