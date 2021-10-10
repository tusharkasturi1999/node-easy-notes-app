const logger = require("../controllers/logger");
module.exports = (err, req, res, next) => {
  //check if content is present
  if (!req.body.content) {
    logger.customlogger.log("error", "Note content can not be empty");
    return res.status(400).send({
      message: "Note content can not be empty (handled by middleware)",
    });
  }
  //validate title name
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    logger.customlogger.log("error", "Note a valid title name");
    return res.status(400).send({
      message: "Note a valid title name",
    });
  } else {
    next();
  }
};
