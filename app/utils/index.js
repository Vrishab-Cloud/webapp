const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const { createLogger, format, transports, level } = require("winston");
const { combine, timestamp, json, errors } = format;

let logger;

const createTheLogger = () => {
  logger = createLogger({
    level: "debug",
    format: combine(errors({ stack: true }), timestamp(), json()),
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        level: "info",
        format: format.printf((log) => {
          return `${log.timestamp} - ${log.level.toUpperCase()}: ${
            log.message
          }\n${log.level == "error" ? log.stack : ""}\n`;
        }),
      })
    );
  } else {
    const files = new transports.File({ filename: "/var/log/webapp/app.log" });
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
