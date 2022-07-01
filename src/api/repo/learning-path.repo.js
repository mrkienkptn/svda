const { nanoid } = require('nanoid')
const { ObjectId } = require('mongoose').Types

const {
  LearningPath,
  Part,
  Lesson,
  LessonPart,
  LearningAction,
  EditPermission,
  Roadmap
} = require('../models')
const { LP } = require('../constants')
const parseFilters = require('../utils/parse-filters')
const cloneLp = require('../utils/cloneLp')

const createLearningPath = async (data) => {
  const lp = new LearningPath(data)
  return await lp.save()
}

const getMyLP = async (ownerId) => {
  const [lps, roadmaps] = await Promise.all([
    LearningPath.find({
      ownerId,
      ownerType: { $ne: LP.ORGANIZATION }
    }),
    Roadmap.find({ ownerId })
  ])
  return { lps, roadmaps }
}

const getLPDetail = async (id) => {
  const lp = await LearningPath.findOne({ id })
    .populate({
      path: 'parts',
      populate: {
        path: 'lessons'
      }
    })
    .populate('rubrics')
    .populate('ownerId', 'avatar email _id name userType')
    .lean()
  if (lp && lp.forkFrom) {
    const sourceLp = await LearningPath.findOne({ id: lp.forkFrom }, { name: 1 })
    lp.cloneFromName = sourceLp.name
  }
  return lp
}

const deleteLP = async (id) => {
  await LearningPath.findByIdAndDelete(id)
}

const updateLP = async (id, data) => {
  const updatedLP = await LearningPath.findOneAndUpdate({ id }, data)
  return updatedLP
}

const searchLP = async (query) => {
  const { page, records, ...rest } = query
  rest.public = true
  const parsedFilters = parseFilters(rest)
  const rs = await LearningPath.aggregate([
    {
      $match: parsedFilters
    },
    {
      $lookup: {
        from: 'users',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner'
      }
    },
    {
      $unwind: '$owner'
    },
    {
      $project: {
        'owner.password': 0,
        'owner.userType': 0,
        'owner.id': 0
      }
    },
    {
      $facet: {
        result: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * records },
          { $limit: records }
        ],
        totalCount: [{ $count: 'count' }]
      }
    }
  ])
  const { result, totalCount } = rs[0]
  const total = totalCount[0] ? totalCount[0].count : 0
  return { data: result, total }
}

const forkLP = async (id, userFork) => {
  const lp = await LearningPath.findOne({ id })
    .populate({
      path: 'parts',
      populate: {
        path: 'lessons',
        populate: {
          path: 'lessonParts',
          populate: {
            path: 'learningActions'
          }
        }
      }
    })
    .lean()
  const rs = cloneLp(lp)
  rs.clonedLp.forkFrom = id
  rs.clonedLp.id = nanoid(10)
  rs.clonedLp.ownerId = ObjectId(userFork)
  const insertRs = await Promise.all([
    new LearningPath(rs.clonedLp).save(),
    Part.insertMany(rs.clonedParts),
    Lesson.insertMany(rs.clonedLessons),
    LessonPart.insertMany(rs.clonedLessonParts),
    LearningAction.insertMany(rs.clonedLearningActions)
  ])
  return insertRs
}

const addEditor = async (learningPathId, userId) => {
  await new EditPermission({ learningPathId, userId }).save()
  return true
}

const removeEditor = async (learningPathId, userId) => {
  await EditPermission.findOneAndDelete({ learningPathId, userId })
  return true
}

const getLPEditors = async (learningPathId) => {
  const editors = await EditPermission.find({ learningPathId }).populate(
    'userId',
    '_id name email avatar'
  )
  return editors.map((editor) => editor.userId)
}

module.exports = {
  createLearningPath,
  getMyLP,
  getLPDetail,
  deleteLP,
  forkLP,
  updateLP,
  searchLP,
  addEditor,
  removeEditor,
  getLPEditors
}
