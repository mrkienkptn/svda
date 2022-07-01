const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')

const uploadFile = {
  params: Joi.object({
    lessonId: Joi.string().required()
  })
}

const deleteFile = {
  params: Joi.object({
    lessonId: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required()
  })
}

module.exports = {
  uploadFileValidate: customValidate(uploadFile),
  deleteFileValidate: customValidate(deleteFile)
}
