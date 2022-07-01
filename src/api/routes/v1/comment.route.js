const { Router } = require('express')

const { commentController: controller } = require('../../controllers')
const { commentValidation: validation } = require('../../validations')
const { verifyToken } = require('../../middlewares')

const router = Router()

router.route('/lesson/:lessonId/parent/:parentId?')
  .post(verifyToken, validation.createCommentValidate, controller.createComment)

router.route('/lesson/:lessonId/:commentId')
  .delete(verifyToken, validation.deleteCommentValidate, controller.deleteComment)

router.route('/:commentId')
  .put(verifyToken, validation.editCommentValidate, controller.editComment)

router.route('/')
  .get(verifyToken, validation.getLessonCommentsValidate, controller.getLessonComments)

module.exports = router
