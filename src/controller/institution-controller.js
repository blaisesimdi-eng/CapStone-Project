const mongoose = require("mongoose");
const institutions = require("../models/institution-models");
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

const getInstitutes = async (req, res) => {
  let uni = await institutions.find().sort().lean().exec();
  console.log("This is your uni");

  if (req.query.institutionName) {
    const institute = String(req.query.institute);
    const query = `$regex:institute, $options:"i"`;

    const uniName = String(req.institutionName).toLowerCase();
    uni = await institutions.find({ institute: query });
    // uni = uni.filter((insti) =>
    //   insti.institutionName.toLowerCase().includes(uniName),
    // );
  }

  return res.status(200).json({
    status: res.statusCode,
    data: uni,
  });
};

const getOneInstitute = async (req, res) => {
  const id = req.params.id;

  const institute = await institutions.findById(id).populate("leaderId").lean();
  if (!institute) {
    return res.status(400).json({
      params: id,
      status: res.statusCode,
      data: null,
    });
  }
  return res.status(200).json({
    status: res.statusCode,
    data: institute,
  });
};

const replaceInstitute = async (req, res) => {
  const id = req.params.id;
  const { institutionName, institutionType, owner, programs, yearEstablished } =
    req.body;
  console.log("Institution Replaced");
  const institute = await institutions.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!institute) {
    return res.status(404).json({
      status: res,
      statusCode,
      message: "Institition not found",
    });
  }
  const instituteExists = await institutions.findById(id);
  if (!instituteExists) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Institition not found",
      data: null,
    });
  }
  const payload = {
    institutionName: institutionName || instituteExists.institutionName,
    institutionType: institutionType || instituteExists.institutionType,
    owner: owner || instituteExists.owner,
    programs: programs || instituteExists.programs,
    yearEstablished: yearEstablished || instituteExists.yearEstablished,
  };
  const uni = await institutions.findByIdAndUpdate(id, payload, {
    runValidators: true,
    returnDocument: "after",
  });

  return res.status(200).json({
    status: res.statusCode,
    message: "Institution replace sucessful",
    data: institute,
  });
};

const updateInstitute = async (req, res) => {
  const id = req.params.id;
  const { owner, programs, contactEmail, contactPhone } = req.body;
  console.log("Replaced done sucessfully");
  const uni = await institutions.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    returnDocument: "after",
  });
  if (!uni) {
    return res.status(404).json({
      message: "Institution not found",
    });
  }
  // if (contactEmail) uni.contactEmail = contactEmail;
  // if (contactPhone) uni.contactPhone = contactPhone;

  return res.status(200).json({
    message: " Update done sucessfully",
    data: uni,
  });
};

module.exports = {
  getInstitutes,
  getOneInstitute,
  replaceInstitute,
  updateInstitute,
};
