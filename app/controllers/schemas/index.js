const { signup, update } = require("./user");

const validator = (schema) => (against) => schema.validate(against);

exports.validateSignup = validator(signup);
exports.validateUpdate = validator(update);
