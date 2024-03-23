const { createLogger, format, transports, level } = require("winston");
const { combine, timestamp, json, errors } = format;

let logger;

const createTheLogger = () => {
  logger = createLogger({
    level: "info",
    format: combine(errors({ stack: true }), timestamp(), json()),
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        level: "debug",
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
  getLogger: () => {
    if (!logger) createTheLogger();
    return logger;
  },
};
