const userRepo = require('./user.repo')
const organizationRepo = require('./organization.repo')
const learningPathRepo = require('./learning-path.repo')
const partRepo = require('./part.repo')
const editPermissionRepo = require('./edit-permission.repo')
const lessonRepo = require('./lesson.repo')
const lessonPartRepo = require('./lesson-part.repo')
const learningActionRepo = require('./learning-action.repo')
const commentRepo = require('./comment.repo')
const rubricRepo = require('./rubric.repo')
const roadmapRepo = require('./roadmap.repo')

module.exports = {
  userRepo,
  organizationRepo,
  learningPathRepo,
  partRepo,
  editPermissionRepo,
  lessonRepo,
  lessonPartRepo,
  learningActionRepo,
  commentRepo,
  rubricRepo,
  roadmapRepo
}
