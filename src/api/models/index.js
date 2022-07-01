const User = require('./user.model')
const EditPermission = require('./editPermission.model')
const LearningAction = require('./learning-action.model')
const LearningPath = require('./learning-path.model')
const LessonPart = require('./lesson-part.model')
const Lesson = require('./lesson.model')
const Notification = require('./notification.model')
const Organization = require('./organization.model')
const Part = require('./part.model')
const Setting = require('./setting.model')
const UserFollowRoadmap = require('./user-follow-roadmap')
const OrganizationUser = require('./organization-user.model')
const LessonUpdate = require('./lesson-update.model')
const Comment = require('./comment.model')
const Rubric = require('./rubric.model')
const Analysis = require('./analysis.model')
const Roadmap = require('./roadmap.model')
const RoadmapStep = require('./roadmap-step.model')

module.exports = {
  EditPermission,
  LearningAction,
  LearningPath,
  LessonPart,
  Lesson,
  Notification,
  Organization,
  OrganizationUser,
  Part,
  Setting,
  User,
  UserFollowRoadmap,
  LessonUpdate,
  Comment,
  Rubric,
  Analysis,
  Roadmap,
  RoadmapStep
}
