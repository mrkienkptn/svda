const { ObjectId } = require('mongoose').Types

const { Roadmap, RoadmapStep, UserFollowRoadmap } = require('../models')

const getRoadmapDetail = async (id) => {
  return await Roadmap.findOne({ id })
    .populate('steps')
    .lean()
}

const getMyRoadmaps = async (ownerId) => {
  return await Roadmap.find({ ownerId })
}

const createRoadmap = async (data) => {
  return await new Roadmap(data).save()
}

const deleteRoadmap = async (id) => {
  const roadmap = await Roadmap.findOneAndDelete({ id })
  const steps = roadmap.steps
  await RoadmapStep.deleteMany({ _id: { $in: steps } })
  return true
}

const deleteStep = async (roadmapId, stepId) => {
  const deletedStep = await RoadmapStep.findByIdAndDelete(stepId)
  const updatedRoadmap = await Roadmap.findOneAndUpdate(
    { id: roadmapId },
    {
      $pull: { steps: stepId },
      $inc: { totalStep: -1, completedStep: deletedStep.completed ? -1 : 0 }
    }
  )
  return updatedRoadmap
}

const createStep = async (roadmapId, stepData) => {
  const stepId = new ObjectId()
  const createStep = (new RoadmapStep({ _id: stepId, ...stepData })).save()
  const addStepToRoadmap = Roadmap.findOneAndUpdate(
    { id: roadmapId },
    {
      $addToSet: { steps: stepId },
      $inc: { totalStep: 1 }
    }
  )
  return await Promise.all([createStep, addStepToRoadmap])
}

const updateRoadmap = async (id, data) => {
  return await Roadmap.findOneAndUpdate({ id }, data, { new: true })
}

const updateStep = async (id, data) => {
  return await RoadmapStep.findByIdAndUpdate(id, data, { new: true })
}

const followRoadmap = async (roadmapId, userId) => {
  await new UserFollowRoadmap({ roadmap: roadmapId, user: userId }).save()
  return true
}

const unfollowRoadmap = async (roadmapId, userId) => {
  await UserFollowRoadmap.findOneAndDelete({ roadmap: roadmapId, user: userId })
  return true
}

const turnOffNotifyFollow = async (roadmapId, userId) => {
  await UserFollowRoadmap.findOneAndUpdate({ roadmap: roadmapId, user: userId }, { notify: false })
  return true
}

const turnOnNotifyFollow = async (roadmapId, userId) => {
  await UserFollowRoadmap.findOneAndUpdate({ roadmap: roadmapId, user: userId }, { notify: true })
  return true
}

module.exports = {
  getRoadmapDetail,
  getMyRoadmaps,
  createRoadmap,
  deleteRoadmap,
  deleteStep,
  createStep,
  updateRoadmap,
  updateStep,
  followRoadmap,
  unfollowRoadmap,
  turnOffNotifyFollow,
  turnOnNotifyFollow
}
