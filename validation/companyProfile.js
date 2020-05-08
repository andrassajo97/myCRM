const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCompanyProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.postal = !isEmpty(data.postal) ? data.postal : "";
  data.fieldofResearch = !isEmpty(data.fieldofResearch)
    ? data.fieldofResearch
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phonenum = !isEmpty(data.phonenum) ? data.phonenum : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Név kötelező";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "Város kötelező";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Közterület kötelező";
  }

  if (Validator.isEmpty(data.postal)) {
    errors.postal = "Írányítószám kötelező";
  }
  
  if (Validator.isEmpty(data.fieldofResearch)) {
    errors.fieldofResearch = "Kutatási terület kötelező";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email formátum nem megfelelő";
  }

  if (Validator.isEmpty(data.phonenum)) {
    errors.phonenum = "Telefonszám kötelező";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
