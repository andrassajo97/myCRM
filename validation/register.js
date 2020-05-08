const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Név kötelező";
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username =
      "A felhasználónévnek 2 és 30 karakter között kell lennie";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Felhasználónév kötelező";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A jelszónak 6 és 30 karakter között kell lennie";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Jelszó kötelező";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Jelszó megerősítése kötelező";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "A jelszavak nem egyeznek";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
