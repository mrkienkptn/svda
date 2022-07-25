const { Admin } = require('../models')

const createUser = (email, hash, name, userType) => {
  const user = new Admin()
  user.email = email
  user.password = hash
  user.name = name
  user.userType = userType
  return user.save()
}

const getUserByeEmail = async (email) => {
  const user = Admin.findOne({ email })
  return user
}

const updateUser = async (userId, data) => {
  return await Admin.findByIdAndUpdate(userId, data)
}

module.exports = {
  createUser,
  getUserByeEmail,
  updateUser
}
