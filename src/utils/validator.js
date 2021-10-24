const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const reMobile = /^[6-9][0-9]{9}$/;

const validateEmail = function (email) {
  return reEmail.test(email);
};

const validateMobile = function (mobile) {
  return reMobile.test(mobile);
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

module.exports = {
  validateEmail,
  validateMobile,
  isValidRequestBody,
  emailRegex: reEmail,
  mobileRegex: reMobile,
  isValid,
  isValidObjectId
};
