const express = require('express')

const userRoutes = require('./user.route')
const resourceRoutes = require('./resource.route')
const learningPathRoutes = require('./learning-path.route')
const partRoutes = require('./part.route')
const lessonRoutes = require('./lesson.route')
const lessonPartRoutes = require('./lesson-part.route')
const learningActionRoutes = require('./learning-action.route')
const commentRoutes = require('./comment.route')
const uploadRoutes = require('./upload.route')
const rubricRoutes = require('./rubric.route')
const organizationRoutes = require('./organization.route')
const roadmapRoutes = require('./roadmap.route')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/resource', resourceRoutes)
router.use('/learning-paths', learningPathRoutes)
router.use('/parts/', partRoutes)
router.use('/lessons/', lessonRoutes)
router.use('/lesson-parts', lessonPartRoutes)
router.use('/learning-actions/', learningActionRoutes)
router.use('/comments', commentRoutes)
router.use('/uploads', uploadRoutes)
router.use('/rubrics', rubricRoutes)
router.use('/organizations', organizationRoutes)
router.use('/roadmaps', roadmapRoutes)

module.exports = router