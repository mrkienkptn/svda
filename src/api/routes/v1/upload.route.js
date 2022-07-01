const { Router } = require('express')

const { uploadController: controller } = require('../../controllers')
const { uploadValidation: validation } = require('../../validations')
const { verifyToken } = require('../../middlewares')

const router = Router()

router.route('/:lessonId')
  .post(verifyToken, validation.uploadFileValidate, controller.uploadFile)
  .delete(verifyToken, validation.deleteFileValidate, controller.deleteFile)
router.route('/profile/avatar')
  .put(verifyToken, controller.changeAvatar)

module.exports = router
