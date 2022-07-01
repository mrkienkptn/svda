const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')

const createComment = {
  params: Joi.object({
    lessonId: Joi.string().required(),
    parentId: Joi.string()
  }),
  body: Joi.object({
    content: Joi.string().required()
  })
}

const editComment = {
  params: Joi.object({
    commentId: Joi.string().required()
  }),
  body: Joi.object({
    content: Joi.string().required()
  })
}

const deleteComment = {
  params: Joi.object({
    lessonId: Joi.string().required(),
    commentId: Joi.string().required()
  })
}

const getLessonComments = {
  query: Joi.object({
    commentIds: Joi.array().items(
      Joi.string().required()
    ).single()
  })
}

module.exports = {
  createCommentValidate: customValidate(createComment),
  editCommentValidate: customValidate(editComment),
  deleteCommentValidate: customValidate(deleteComment),
  getLessonCommentsValidate: customValidate(getLessonComments)
}
