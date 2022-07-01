const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { roadmapRepo } = require('../repo')

const getRoadmapDetail = async (req, res, next) => {
  const { id: ownerId } = req.payload
  const { roadmapId } = req.params
  try {
    const rs = await roadmapRepo.getRoadmapDetail(roadmapId)
    if (rs) {
      rs.yours = rs.ownerId.toString() === ownerId
    }
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const getMyRoadmaps = async (req, res, next) => {
  const { id: ownerId } = req.payload
  try {
    const rs = await roadmapRepo.getMyRoadmaps(ownerId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const createRoadmap = async (req, res, next) => {
  const { id: ownerId } = req.payload
  try {
    const rs = await roadmapRepo.createRoadmap({ ownerId, ...req.body })
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const updateRoadmap = async (req, res, next) => {
  const { roadmapId } = req.params
  try {
    const rs = await roadmapRepo.updateRoadmap(roadmapId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const deleteRoadmap = async (req, res, next) => {
  const { roadmapId } = req.params
  try {
    const rs = await roadmapRepo.deleteRoadmap(roadmapId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const createStep = async (req, res, next) => {
  const { roadmapId } = req.params
  try {
    const rs = await roadmapRepo.createStep(roadmapId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs[0] }))
  } catch (error) {
    next(error)
  }
}

const updateStep = async (req, res, next) => {
  const { stepId } = req.params
  try {
    const rs = await roadmapRepo.updateStep(stepId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const deleteStep = async (req, res, next) => {
  const { roadmapId, stepId } = req.params
  try {
    const rs = await roadmapRepo.deleteStep(roadmapId, stepId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const followRoadmap = async (req, res, next) => {
  const { roadmapId } = req.params
  const { id } = req.payload
  try {
    const rs = await roadmapRepo.followRoadmap(roadmapId, id)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const unfollowRoadmap = async (req, res, next) => {
  const { roadmapId } = req.params
  const { id } = req.payload
  try {
    const rs = await roadmapRepo.unfollowRoadmap(roadmapId, id)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const turnOffNotifyFollow = async (req, res, next) => {
  const { roadmapId } = req.params
  const { id } = req.payload
  try {
    const rs = await roadmapRepo.turnOffNotifyFollow(roadmapId, id)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const turnOnNotifyFollow = async (req, res, next) => {
  const { roadmapId } = req.params
  const { id } = req.payload
  try {
    const rs = await roadmapRepo.turnOnNotifyFollow(roadmapId, id)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRoadmapDetail,
  getMyRoadmaps,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  createStep,
  updateStep,
  deleteStep,
  followRoadmap,
  unfollowRoadmap,
  turnOffNotifyFollow,
  turnOnNotifyFollow
}
