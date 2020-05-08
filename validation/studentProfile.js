const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.uni = !isEmpty(data.uni) ? data.uni : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.postal = !isEmpty(data.postal) ? data.postal : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phonenum = !isEmpty(data.phonenum) ? data.phonenum : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Név kötelező";
  }

  if (Validator.isEmpty(data.uni)) {
    errors.uni = "Egyetem kötelező";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Szak kötelező";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Képzési szint kötelező";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "Város kötelező";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Közterület kötelező";
  }

  if (Validator.isEmpty(data.postal)) {
    errors.postal = "Írányítószám kötelező";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email kötelező";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email formátum nem megfelelő";
  }

  if (Validator.isEmpty(data.phonenum)) {
    errors.phonenum = "Telefonszám kötelező";
  }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
