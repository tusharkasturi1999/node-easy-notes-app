const { createLogger, transports, format } = require("winston");
//const winston = require('winston')
const customLogger = createLogger({
  transports: [
    new transports.File({
      filename: "./app/logs/info.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
       // format.align(),
        format.json()
      ),
    }),
    new transports.File({
      filename: "./app/logs/error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
       // format.align(),
        format.json()
      ),
    }),
  ],
});
module.exports = { customLogger };
