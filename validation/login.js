const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Felhasználónév kötelező";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Jelszó kötelező";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
