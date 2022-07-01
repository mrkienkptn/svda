const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')
const { lessonRepo } = require('../repo')

const getLesson = async (req, res, next) => {
  const { learningPathId, lessonId } = req.params
  const { id } = req.payload
  try {
    const [lesson, { outcomes, ownerId }, editPermission] = await lessonRepo.getLesson(
      id,
      learningPathId,
      lessonId
    )
    lesson.yours = id === ownerId.toString() || editPermission !== null
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: { lesson, outcomes }
      })
    )
  } catch (error) {
    next(error)
  }
}

const createLesson = async (req, res, next) => {
  const { partId } = req.params
  const { name } = req.body
  try {
    const createdLesson = await lessonRepo.createLesson(partId, name)
    return res.status(httpStatus.OK).json(getApiResponse({ data: createdLesson }))
  } catch (error) {
    next(error)
  }
}

const deleteLesson = async (req, res, next) => {
  const { partId } = req.params
  const { lessonId } = req.body
  try {
    await lessonRepo.deleteLesson(partId, lessonId)
    return res.status(httpStatus.OK).json(getApiResponse({ msg: 'Deleted' }))
  } catch (error) {
    next(error)
  }
}

const updateLesson = async (req, res, next) => {
  const { lessonId } = req.params
  try {
    const updatedLesson = await lessonRepo.updateLesson(lessonId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedLesson }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLesson,
  createLesson,
  deleteLesson,
  updateLesson
}
