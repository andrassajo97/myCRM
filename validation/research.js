const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResearchInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.assigned = !isEmpty(data.assigned) ? data.assigned : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Kutatás neve kötelező";
  }

  if (Validator.isEmpty(data.assigned)) {
    errors.assigned = "Kötelező kitölteni!";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Téma kötelező";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Kezdési dátum kötelező";
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = "Befejezési dátum kötelező";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Leírás kötelező";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
