const { Router } = require('express')

const { lessonController: controller } = require('../../controllers')
const { lessonValidation: validation } = require('../../validations')
const { verifyToken } = require('../../middlewares')

const router = Router()

router
  .route('/:learningPathId/:lessonId')
  .get(verifyToken, validation.getLessonValidate, controller.getLesson)

router
  .route('/:partId')
  .post(verifyToken, validation.createLessonValidate, controller.createLesson)
  .delete(verifyToken, validation.deleteLessonValidate, controller.deleteLesson)

router
  .route('/:lessonId')
  .put(verifyToken, validation.updateLessonValidate, controller.updateLesson)

module.exports = router
