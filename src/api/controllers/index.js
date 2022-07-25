const userController = require('./user.controller')
const organizationController = require('./organization.controller')
const learningPathController = require('./learning-path.controller')
const partController = require('./part.controller')
const lessonController = require('./lesson.controller')
const lessonPartController = require('./lesson-part.controller')
const learningActionController = require('./learning-action.controller')
const commentController = require('./comment.controller')
const uploadController = require('./upload.controller')
const rubricController = require('./rubric.controller')
const roadmapController = require('./roadmap.controller')
const notifController = require('./notif.controller')
const analysisController = require('./analysis.controller')
const adminController = require('./admin.controller')

module.exports = {
  userController,
  organizationController,
  learningPathController,
  partController,
  lessonController,
  lessonPartController,
  learningActionController,
  commentController,
  uploadController,
  rubricController,
  roadmapController,
  notifController,
  analysisController,
  adminController
}
