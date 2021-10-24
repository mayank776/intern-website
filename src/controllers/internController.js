const { collegeModel, internModel } = require("../models");

const { validator } = require("../utils");

const registerCollege = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide college details",
      });
      return;
    }

    const { name, fullName, logoLink } = requestBody;

    if (!validator.isValid(name)) {
      res.status(400).send({ status: false, message: " name is required" });
      return;
    }

    const isNameAlreadyUsed = await collegeModel.findOne({ name }); // {email: email} object shorthand property

    if (isNameAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${name} name is already registered`,
      });
      return;
    }

    if (!validator.isValid(fullName)) {
      res.status(400).send({ status: false, message: "fullName is required" });
      return;
    }

    if (!validator.isValid(logoLink)) {
      res.status(400).send({ status: false, message: "logoLink is required" });
      return;
    }

    const collegeData = { name, fullName, logoLink };
    const newCollege = await collegeModel.create(collegeData);

    res.status(201).send({ status: true, data: newCollege });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const registerIntern = async function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide intern details",
      });
      return;
    }

    const { name, email, mobile, collegeName } = requestBody;

    if (!validator.isValid(name)) {
      res.status(400).send({ status: false, message: " name is required" });
      return;
    }

    if (!validator.isValid(collegeName)) {
      res
        .status(400)
        .send({ status: false, message: "college name is required" });
      return;
    }

    if (!validator.isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` });
      return;
    }

    if (!validator.validateEmail(email)) {
      res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
      return;
    }

    if (!validator.isValid(mobile)) {
      res.status(400).send({ status: false, message: `mobile is required` });
      return;
    }

    if (!validator.validateMobile(mobile)) {
      res.status(400).send({
        status: false,
        message: `mobile should be a valid mobile number`,
      });
      return;
    }

    const isEmailAlreadyUsed = await internModel.findOne({ email }); // {email: email} object shorthand property

    if (isEmailAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
      return;
    }

    const isMobileAlreadyUsed = await internModel.findOne({ mobile }); // {email: email} object shorthand property

    if (isMobileAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${mobile} mobile number is already registered`,
      });
      return;
    }

    let collegeId = await collegeModel.findOne({ name: collegeName });

    if (!collegeId) {
      res.status(404).send({ status: false, msg: "college not found" });
    }

    const internData = {
      name: name,
      email: email,
      mobile: mobile,
      collegeId: collegeId,
    };

    const newIntern = await internModel.create(internData);

    res.status(201).send({ status: true, data: newIntern });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

let collegeDetails = async function (req, res) {
  // to go from one domain to another
  res.header('Access-Control-Allow-Origin', '*')
  try {
    const queryParams = req.query;

    if (!validator.isValidRequestBody(queryParams)) {
      res.status(400).send({
        status: false,
        message: "Invalid query parameters. Please provide college name",
      });
      return;
    }


    let collegeName = queryParams.collegeName;
    let college = await collegeModel.findOne({ name: collegeName });
    if(!college) {
        res.status(404).send({
          status: false,
          message: "Invalid query parameters. Please provide valid college name",
        });
        return;
      }
    let interns = await internModel.find({ collegeId: college._id }, {isDeleted : 0, collegeId:0, __v:0});

    if (Array.isArray(interns) && interns.length === 0) {
      res.status(404).send({ status: false, message: "No interns found" });
      return;
    }

    res.status(200).send({
      status: true,
      data: {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: interns,
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerCollege,
  registerIntern,
  collegeDetails,
};
