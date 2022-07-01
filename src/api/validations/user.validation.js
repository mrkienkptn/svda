const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')

const signup = {
  body: Joi.object({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .required(),
    name: Joi
      .string()
      .required()
      .min(2),
    userType: Joi
      .string()
      .required()
  })
}

const login = {
  body: Joi.object({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .required()
  })
}

const getUsers = {
  query: Joi.object({
    userId: Joi
      .string()
      .required()
  })
}

const getUsersByEmail = {
  query: Joi.object({
    email: Joi.string().required()
  })
}

module.exports = {
  loginValidate: customValidate(login),
  signupValidate: customValidate(signup),
  getUsersValidate: customValidate(getUsers),
  getUsersByEmailValidate: customValidate(getUsersByEmail)
}
