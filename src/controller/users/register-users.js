const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const joi = require("joi");
const mongoose = require("mongoose");
const user = require("../../models/users-model");

const userData = (payload) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    contactEmail: joi.string().required(),
    passWord: joi.string().required(),
    role: joi.string().required(),
  });

  const { error, value } = schema.validate(payload);
  return { error, value };
};

const loginUserData = (payload) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    passWord: joi.string().required(),
    role: joi.string().required(),
  });
  const { error, value } = schema.validate(payload);
  return { error, value };
};

const registerUser = async (req, res) => {
  const { error, value } = userData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0].message,
      data: null,
    });
  }
  const contactEmailExists = await user.findOne({
    contactEmail: value.contactEmail,
  });
  if (contactEmailExists) {
    return res.status(409).json({
      status: res.statusCode,
      message: "Email already exist",
      data: null,
    });
  }
  const hashedPassword = await bcrypt.hash(value.passWord, 10);
  const newUser = await user.create({
    ...value,
    passWord: hashedPassword,
  });

  return res.status(201).json({
    message: "User registered succesfully",
    data: {
      id: newleader._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    },
  });
};
const loginUser = async (req, res) => {
  const { error, value } = loginUserData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0],
      data: null,
    });
  }
  const { firstName, lastName, passWord, contactEmail } = value;
  const validUser = await user.findOne({
    email: value.contactEmail,
  });
  if (!validUser) {
    return res.status(400).json({
      status: res.statusCode,
      message: "Input valid user credentials",
      data: null,
    });
  }
  const isValidPassword = await bcrypt.compare(passWord, validUser.passWord);
  if (!isValidPassword) {
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
      lastName: validUser.lastName,
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
    message: "User logged in succesfully",
    data: {
      id: validUser._id,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      token,
    },
  });
};
module.exports = { registerUser, loginUser };
