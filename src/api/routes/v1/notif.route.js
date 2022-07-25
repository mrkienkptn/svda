const { Router } = require('express')

const { notifController: controller } = require('../../controllers')
const { verifyToken } = require('../../middlewares')

const router = Router()

router.route('/').get(verifyToken, controller.getNotifs)

module.exports = router
