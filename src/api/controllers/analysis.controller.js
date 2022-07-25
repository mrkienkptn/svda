const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')

const { analysisRepo } = require('../repo')

const countUsers = async (req, res, next) => {
  try {
    const rs = await analysisRepo.getAmountUser()
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

const topStatistics = async (req, res, next) => {
  try {
    const [
      topStarLpUser,
      topStarRoadmapUser,
      topStarCourse,
      topStarRms,
      topFollowRoadmap,
      totalCourse,
      totalRoadmap,
      totalLpTimeSr
    ] = await Promise.all([
      analysisRepo.topStarLpUser(),
      analysisRepo.topStarRoadmapUser(),
      analysisRepo.topStarLps(),
      analysisRepo.topStarRms(),
      analysisRepo.topFollowRoadmap(),
      analysisRepo.totalCourse(),
      analysisRepo.totalRoadmap(),
      analysisRepo.totalLpTimeSr()
    ])
    return res.status(httpStatus.OK).json(
      getApiResponse({
        data: {
          topStarLpUser,
          topStarRoadmapUser,
          topStarCourse,
          topStarRms,
          topFollowRoadmap,
          totalCourse,
          totalRoadmap,
          totalLpTimeSr
        }
      })
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  countUsers,
  topStatistics
}
