const httpStatus = require('http-status')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const getApiResponse = require('../utils/response')
const { lessonRepo, userRepo } = require('../repo')

const uploadFile = async (req, res, next) => {
  const { lessonId } = req.params
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(getApiResponse({ msg: 'No files were uploaded' }))
    }
    const uploadFolder = path.join(__dirname, '..', '..', 'resources', lessonId)
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder)
    }
    const mvFiles = Object.entries(req.files).map(([name, file]) =>
      file.mv(`${uploadFolder}/${file.name}`)
    )
    const resData = Object.entries(req.files).map(([name, file]) =>
      ({ name: file.name, type: file.mimetype })
    )
    const addLinkToLesson = lessonRepo.updateLesson(lessonId, {
      $addToSet: {
        resources: {
          $each: Object.entries(req.files).map(([name, file]) => ({
            name: file.name,
            type: file.mimetype
          }))
        }
      }
    })
    await Promise.all([...mvFiles, addLinkToLesson])
    return res.status(httpStatus.OK).json(getApiResponse({ data: resData }))
  } catch (error) {
    next(error)
  }
}

const deleteFile = async (req, res, next) => {
  const { lessonId } = req.params
  const { name, type } = req.body
  try {
    fs.unlinkSync(path.join(__dirname, '..', '..', 'resources', lessonId, name))
    await lessonRepo.updateLesson(lessonId, {
      $pull: { resources: { name, type } }
    })
    return res.status(httpStatus.OK).json(getApiResponse({ msg: 'Deleted' }))
  } catch (error) {
    next(error)
  }
}

const changeAvatar = async (req, res, next) => {
  const { id } = req.payload
  try {
    const avatarFolder = path.join(__dirname, '..', '..', 'resources', 'avatars', id)
    if (!fs.existsSync(avatarFolder)) {
      fs.mkdirSync(avatarFolder)
    }
    const file = req.files.avatar
    const [, , user] = await Promise.all([
      file.mv(`${avatarFolder}/${file.name}`),
      sharp(file.data).resize(64, 64).toFile(`${avatarFolder}/64x64${file.name}`),
      userRepo.updateUser(id, { avatar: file.name })
    ])
    if (user.avatar && user.avatar !== file.name) {
      if (fs.existsSync(`${avatarFolder}/${user.avatar}`)) {
        fs.unlinkSync(`${avatarFolder}/${user.avatar}`)
      }
      if (fs.existsSync(`${avatarFolder}/64x64${user.avatar}`)) {
        fs.unlinkSync(`${avatarFolder}/64x64${user.avatar}`)
      }
    }
    return res.status(httpStatus.OK).json(getApiResponse({ data: file.name }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadFile,
  deleteFile,
  changeAvatar
}
