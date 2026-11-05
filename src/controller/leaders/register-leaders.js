const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const joi = require("joi");
const mongoose = require("mongoose");
const leaders = require("../../models/leaders-models");
// const institutions = [
//   {
//     id: "6937698d875da3818f908883",
//     owner: "Federal",
//     institutionName: "Abubakar Tafawa Balewa University, Bauchi",
//     institutionType: "University",
//     website: "https://www.atbu.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "1980",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908884",
//     owner: "Federal",
//     institutionName: "Ahmadu Bello University, Zaria",
//     institutionType: "University",
//     website: "https://www.abu.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "1962",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908885",
//     owner: "Federal",
//     institutionName: "Bayero University, Kano",
//     institutionType: "University",
//     website: "https://www.buk.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "1975",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908886",
//     owner: "Federal",
//     institutionName: "Federal University Gashua, Yobe",
//     institutionType: "University",
//     website: "https://www.fugashua.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "2013",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908887",
//     owner: "Federal",
//     institutionName: "Federal University of Petroleum Resources, Effurun",
//     institutionType: "University",
//     website: "https://www.fupre.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "2007",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908888",
//     owner: "Federal",
//     institutionName: "Federal University of Technology, Akure",
//     institutionType: "University",
//     website: "https://www.futa.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "1981",
//     contactPhone: null,
//     contactEmail: null,
//   },
//   {
//     id: "6937698d875da3818f908889",
//     owner: "Federal",
//     institutionName: "Federal University of Technology, Minna",
//     institutionType: "University",
//     website: "https://www.futminna.edu.ng",
//     programs: [],
//     accreditationNote: null,
//     additionalDetails: null,
//     yearEstablished: "1982",
//     contactPhone: null,
//     contactEmail: null,
//   },
// ];
const leadersData = (payload) => {
  const schema = joi.object({
    owner: joi.string(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    contactPhone: joi.string().required().max(11),
    contactEmail: joi.string(),
    role: joi.string(),
    IsActive: joi.boolean(),
    passWord: joi.string(),
  });

  const { error, value } = schema.validate(payload);
  return { error, value };
};

const loginLeadersData = (payload) => {
  const schema = joi.object({
    contactEmail: joi.string().required(),
    passWord: joi.string().required(),
    role: joi.string().required(),
  });

  const { error, value } = schema.validate(payload);
  return { error, value };
};

const registerLeaders = async (req, res) => {
  const { error, value } = leadersData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0].message,
      data: null,
    });
  }
  const contactEmailExists = await leaders.findOne({
    contactEmail: value.contactEmail,
  });
  if (contactEmailExists) {
    return res.status(409).json({
      status: res.statusCode,
      message: "ContactEmail already used by another user",
      data: null,
    });
  }
  const hashedPassword = await bcrypt.hash(value.passWord, 10);
  const newleader = await leaders.create({
    ...value,
    passWord: hashedPassword,
  });

  return res.status(200).json({
    message: "Leader registered succesfully",
    data: {
      id: newleader._id,
      name: newleader.firstName,
      email: newleader.contactEmail,
      role: newleader.role,
    },
  });
};
const loginLeaders = async (req, res) => {
  const { error, value } = loginLeadersData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0],
      data: null,
    });
  }
  const { contactEmail, passWord, role } = value;
  const validUser = await leaders.findOne({
    contactEmail: value.contactEmail,
  });
  if (!validUser) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Input valid user credentials",
      data: null,
    });
  }
  const isValidPasssword = await bcrypt.compare(passWord, validUser.passWord);
  if (!isValidPasssword) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Input valid user credentials",
      data: null,
    });
  }

  const token = jwt.sign(
    {
      id: validUser.id,
      firstName: validUser.firstName,
      role: validUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
  if (role.toLowerCase().trim() !== validUser.role.toLowerCase().trim()) {
    return res.status(403).json({
      status: res.statusCode,
      message: "Input correct credentials",
      data: null,
    });
  }
  return res.status(200).json({
    message: "Leader logged in succesfully",
    data: {
      id: validUser._id,
      name: validUser.firstName,
      email: validUser.contactEmail,
      role: validUser.role,
      token,
    },
  });
};
module.exports = { registerLeaders, loginLeaders };
