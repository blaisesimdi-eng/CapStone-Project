const joi = require("joi");
const mongoose = require("mongoose");
const leaders = require("../models/leaders-models");
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
    leaderId: joi.string(),
  });

  const { error, value } = schema.validate(payload);
  return { error, value };
};
const addLeaders = async (req, res) => {
  const { error, value } = leadersData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0].message,
      data: null,
    });
  }
  if (!value) {
    return res.status(400).json({
      message: "Value not found, please input correctly",
    });
  }
  const newleader = new leaders(req.body);
  await newleader.save();

  return res.status(201).json({
    message: "Leader added succesfully",
    data: newleader,
  });
};
module.exports = addLeaders;
