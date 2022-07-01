const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { commentRepo } = require('../repo')

const createComment = async (req, res, next) => {
  const { id } = req.payload
  const { lessonId } = req.params
  const { content } = req.body
  try {
    if (req.params.parentId) {
      const createdComment = await commentRepo.createComment(
        lessonId,
        id,
        content,
        req.params.parentId
      )
      return res.status(httpStatus.OK).json(getApiResponse({ data: createdComment }))
    } else {
      const createdComment = await commentRepo.createComment(lessonId, id, content)
      return res.status(httpStatus.OK).json(getApiResponse({ data: createdComment }))
    }
  } catch (error) {
    next(error)
  }
}

const editComment = async (req, res, next) => {
  const { commentId } = req.params
  const { content } = req.body
  try {
    const editedComment = await commentRepo.editComment(commentId, content)
    return res.status(httpStatus.OK).json(getApiResponse({ data: editedComment }))
  } catch (error) {
    next(error)
  }
}

const deleteComment = async (req, res, next) => {
  const { lessonId, commentId } = req.params
  try {
    await commentRepo.deleteComment(lessonId, commentId)
    return res.status(httpStatus.OK).json(getApiResponse({ msg: 'Deleted' }))
  } catch (error) {
    next(error)
  }
}

const getLessonComments = async (req, res, next) => {
  const { commentIds } = req.query
  try {
    const comments = await commentRepo.getLessonComments(commentIds)
    return res.status(httpStatus.OK).json(getApiResponse({ data: comments }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createComment,
  editComment,
  deleteComment,
  getLessonComments
}
