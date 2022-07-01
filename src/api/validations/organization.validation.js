const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')

const createOrganization = {
  body: Joi.object({
    name: Joi.string().required(),
    ogzType: Joi.string().required(),
    description: Joi.string(),
    imageLink: Joi.string()
  })
}

const updateOrganization = {
  params: Joi.object({
    ogzId: Joi.string().required()
  }),
  body: {
    name: Joi.string().required(),
    ogzType: Joi.string().required(),
    admin: Joi.string().required(),
    description: Joi.string(),
    imageLink: Joi.string()
  }
}

const getOrganization = {
  params: Joi.object({
    ogzId: Joi.string().required()
  })
}

const deleteOrganization = {
  params: Joi.object({
    ogzId: Joi.string().required()
  })
}

const createLearningPath = {
  params: Joi.object({
    ogzId: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().empty(),
    ownerType: Joi.string().required()
  })
}

const deleteLearningPath = {
  params: Joi.object({
    ogzId: Joi.string().required(),
    learningPathId: Joi.string().required()
  })
}

const memberOgz = {
  params: Joi.object({
    ogzId: Joi.string().required()
  }),
  body: Joi.object({
    user: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      id: Joi.string(),
      avatar: Joi.string()
    }),
    role: Joi.string().required()
  })
}

const acceptInvite = {
  query: Joi.object({
    token: Joi.string()
  })
}

module.exports = {
  createOrganizationValidate: customValidate(createOrganization),
  updateOrganizationValidate: customValidate(updateOrganization),
  getOrganizationValidate: customValidate(getOrganization),
  deleteOrganizationValidate: customValidate(deleteOrganization),
  createLearningPathValidate: customValidate(createLearningPath),
  deleteLearningPathValidate: customValidate(deleteLearningPath),
  memberOgzValidate: customValidate(memberOgz),
  acceptInviteValidate: customValidate(acceptInvite)
}
