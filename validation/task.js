const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.date = !isEmpty(data.date) ? data.date : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.research = !isEmpty(data.research) ? data.research : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Típus kötelező";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Leírás kötelező";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Dátum kötelező";
  }

  if (Validator.isEmpty(data.research)) {
    errors.research = "Kutatás kötelező";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
