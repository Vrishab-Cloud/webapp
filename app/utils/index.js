const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;

let logger;

const console = new transports.Console({
  format: format.printf((log) => {
    return `${log.timestamp} - ${log.level.toUpperCase()}: ${log.message}`;
  }),
});

const files = new transports.File({ filename: "/var/log/app.log" });

const createTheLogger = () => {
  logger = createLogger({
    level: "debug",
    format: combine(timestamp(), json()),
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(console);
  } else {
    logger.add(files);
  }
};

module.exports = {
  bcryptPassword: async (password) => {
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },

  getLogger: () => {
    if (!logger) createTheLogger();
    return logger;
  },
};
