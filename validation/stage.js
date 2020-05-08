const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStageInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Folyamat neve kötelező";
  }

  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "Határidő kötelező";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Leírás kötelező";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
