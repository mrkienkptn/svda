const { User, LearningPath } = require('../models')
const { LP } = require('../constants')

const createUser = (email, hash, name, userType) => {
  const user = new User()
  user.email = email
  user.password = hash
  user.name = name
  user.userType = userType
  return user.save()
}

const getUserByeEmail = async (email) => {
  const user = User.findOne({ email })
  return user
}

const getUsersByEmail = async (email) => {
  const users = await User.find(
    { email: new RegExp(email, 'i') },
    { password: 0, specialized: 0, userType: 0, __v: 0 }
  )
  return users
}

const getUser = async (userId) => {
  const user = User.findById(userId)
  const lps = LearningPath.find({ ownerId: userId, ownerType: { $ne: LP.ORGANIZATION } })
  return await Promise.all([user, lps])
}

const updateUser = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, data)
}

module.exports = {
  createUser,
  getUser,
  getUserByeEmail,
  getUsersByEmail,
  updateUser
}
