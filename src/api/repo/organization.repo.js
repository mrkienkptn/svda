const { ObjectId } = require('mongoose').Types

const { Organization, LearningPath, OrganizationUser } = require('../models')

const createOrganization = async (data) => {
  const organization = new Organization(data)
  return await organization.save()
}

const updateOrganization = async (ogzId, data) => {
  return await Organization.findByIdAndUpdate(ogzId, data, { new: true })
}

const updateBackgroundImg = async (ogzId, data) => {
  return await Organization.findByIdAndUpdate(ogzId, data)
}

const createOgzLP = async (ogzId, data) => {
  const newLpId = new ObjectId()
  const createdOgzLP = (new LearningPath({ ...data, _id: newLpId })).save()
  const updatedOgz = Organization.findByIdAndUpdate(ogzId, {
    $addToSet: { learningPaths: newLpId }
  }, { new: true })
  return await Promise.all([createdOgzLP, updatedOgz])
}

const deleteOgzLP = async (ogzId, learningPathId) => {
  await Promise.all([
    Organization.findByIdAndUpdate(ogzId, {
      $pull: { learningPaths: learningPathId }
    }),
    LearningPath.findByIdAndDelete(learningPathId)
  ])
}

const addMember = async (ogzId, user, role) => {
  const newOU = new OrganizationUser({ ogz: ogzId, user: user._id, role })
  return await newOU.save()
}

const removeMember = async (ogzId, user) => {
  return await OrganizationUser.findOneAndDelete({ ogz: ogzId, user: user._id })
}

const getMembers = async (ogzId) => {
  const members = await OrganizationUser.find({ ogz: ogzId }, { ogz: 0 })
    .populate('user', 'name email _id avatar')
    .lean()
  return members.map((member) => ({ ...member.user, role: member.role }))
}

const getOgzDetail = async (ogzId) => {
  const [ogzDetail, members] = await Promise.all([
    Organization.findById(ogzId)
      .populate('admin', '_id name email avatar')
      .populate('learningPaths')
      .lean(),
    OrganizationUser.find({ ogz: ogzId })
      .populate({
        path: 'user',
        select: '_id name email avatar'
      })
      .lean()
  ])
  return { ogzDetail, members }
}

const getMyOgzs = async (userId) => {
  const [adminOgz, memberOgz] = await Promise.all([
    Organization.find({ admin: userId }).lean(),
    OrganizationUser.find({ user: userId })
      .populate('ogz')
      .lean()
  ])
  const mOgz = memberOgz.map((ogz) => (ogz.ogz))
  return [...adminOgz, ...mOgz]
}

const acceptInvite = async (ogzId, user) => {
  return await OrganizationUser.findOneAndUpdate(
    { ogz: ogzId, user: user._id },
    { accepted: true, inviting: false },
    { new: true }
  )
}

const denyInvite = async (ogzId, user) => {

}

module.exports = {
  createOrganization,
  createOgzLP,
  updateOrganization,
  deleteOgzLP,
  getOgzDetail,
  addMember,
  removeMember,
  getMembers,
  getMyOgzs,
  acceptInvite,
  denyInvite,
  updateBackgroundImg
}
