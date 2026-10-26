const http = require("http");
//const server = http.createServer()
const express = require("express");
const institutionRoute = require("./routes/institution-routes.js");
const leadersRoute = require("./routes/leaders-routes.js");
const app = express();
const logger = require("./middleware/logger.js");
const connectDb = require("./config/helper.js");
const port = 2000;

const institutions = [
  {
    id: "6937698d875da3818f908883",
    owner: "Federal",
    institutionName: "Abubakar Tafawa Balewa University, Bauchi",
    institutionType: "University",
    website: "https://www.atbu.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "1980",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908884",
    owner: "Federal",
    institutionName: "Ahmadu Bello University, Zaria",
    institutionType: "University",
    website: "https://www.abu.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "1962",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908885",
    owner: "Federal",
    institutionName: "Bayero University, Kano",
    institutionType: "University",
    website: "https://www.buk.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "1975",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908886",
    owner: "Federal",
    institutionName: "Federal University Gashua, Yobe",
    institutionType: "University",
    website: "https://www.fugashua.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "2013",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908887",
    owner: "Federal",
    institutionName: "Federal University of Petroleum Resources, Effurun",
    institutionType: "University",
    website: "https://www.fupre.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "2007",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908888",
    owner: "Federal",
    institutionName: "Federal University of Technology, Akure",
    institutionType: "University",
    website: "https://www.futa.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "1981",
    contactPhone: null,
    contactEmail: null,
  },
  {
    id: "6937698d875da3818f908889",
    owner: "Federal",
    institutionName: "Federal University of Technology, Minna",
    institutionType: "University",
    website: "https://www.futminna.edu.ng",
    programs: [],
    accreditationNote: null,
    additionalDetails: null,
    yearEstablished: "1982",
    contactPhone: null,
    contactEmail: null,
  },
];
connectDb();
app.use(express.json());
app.use(logger);
app.use("/", institutionRoute);
app.use("/", leadersRoute);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Capstone Project:)",
  });
});
// app.get("/institution", (req, res) => {
//   let uni = institutions;
//   console.log("This is your uni");

//   if (req.query.institutionName) {
//     const uniName = String(req.institutionName).toLowerCase();
//     uni = uni.filter((insti) =>
//       insti.institutionName.toLowerCase().includes(uniName),
//     );
//   }

//   return res.status(200).json({
//     status: res.statusCode,
//     data: uni,
//   });
// });

// app.post("/institution", (req, res) => {
//   const { institutionName, institutionType } = req.body;
//   if (!institutionName) {
//     return res.status(400).json({
//       message: "InstitutionName not found, please input correctly",
//     });
//   }
//   const newSchool = {
//     id: institutions.length + 1,
//     institutionName,
//     institutionType,
//   };
//   institutions.push(newSchool);
//   return res.status(201).json({
//     message: "institution added succesfully",
//     data: newSchool,
//   });
// });
// app.patch("/institution/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const { institutionName, institutionType } = req.body;
//   console.log("Institution Updated");
//   const uni = institutions.find((school) => school.id === id);

//   if (!uni) {
//     res.status(404).json({
//       message: "Institition not found",
//     });
//   }
//   if (institutionName) uni.institutionName = institutionName;
//   if (institutionType) uni.institutionType = institutionType;

//   return res.status(200).json({
//     message: "Institution update sucessful",
//     data: uni,
//   });
// });
// app.put("/institution/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const { owner, programs, contactEmail, contactPhone } = req.body;
//   console.log("Replaced done sucessfully");
//   const uni = institutions.finds((school) => school.id === id);
//   if (!uni) {
//     return res.status(404).json({
//       message: "Institution not found",
//     });
//   }
//   if (contactEmail) uni.contactEmail = contactEmail;
//   if (contactPhone) uni.contactPhone = contactPhone;

//   return res.status(200).json({
//     message: " Replaced done sucessfully",
//     data: uni,
//   });
// });
// app.get("/institution/:id", (req, res) => {
//   const id = req.params.id;
//   if (!id) {
//     return res.status(400).json({
//       params: id,
//       status: res.statusCode,
//       message: "Sorry id not Valid!",
//     });
//   }
//   const Institution = institutions.find((Inst) => Inst.id === id);
//   if (!Institution) {
//     return res.status(400).json({
//       params: id,
//       status: res.statusCode,
//       data: null,
//     });
//   }
//   return res.status(200).json({
//     params: id,
//     status: res.statusCode,
//     data: Institution,
//   });
// });
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Opps, Page not found",
  });
});

app.listen(port, () => {
  console.log(`Express server is up and runnig on port ${port}`);
});
