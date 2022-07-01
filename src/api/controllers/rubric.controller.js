const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { rubricRepo } = require('../repo')

const createRubric = async (req, res, next) => {
  const { learningPathId } = req.params
  try {
    const createdRubric = await rubricRepo.createRubric(learningPathId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: createdRubric }))
  } catch (error) {
    next(error)
  }
}

const updateRubric = async (req, res, next) => {
  const { rubricId } = req.params
  try {
    const updatedRubric = await rubricRepo.updateRubric(rubricId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedRubric }))
  } catch (error) {
    next(error)
  }
}

const getRubric = async (req, res, next) => {
  const { rubricId } = req.params
  try {
    const rubric = await rubricRepo.getRubric(rubricId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rubric }))
  } catch (error) {
    next(error)
  }
}

const getLPRubrics = async (req, res, next) => {
  const { learningPathId } = req.params
  try {
    const rubric = await rubricRepo.getLPRubrics(learningPathId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rubric }))
  } catch (error) {
    next(error)
  }
}

const deleteRubric = async (req, res, next) => {
  const { learningPathId, rubricId } = req.params
  try {
    await rubricRepo.deleteRubric(learningPathId, rubricId)
    return res.status(httpStatus.OK).json(getApiResponse({ msg: 'Deleted' }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createRubric,
  updateRubric,
  deleteRubric,
  getRubric,
  getLPRubrics
}
