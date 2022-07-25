const schedule = require('node-schedule')

const { analysisRepo } = require('../repo')

// const autoCountUser = async () => {
//   await analysisRepo.insertAmountUser()
// }

const autoCountLp = async () => {
  await analysisRepo.insertAmountLp()
}

const startAuto = () => {
  schedule.scheduleJob('Count lp', '*/1 * * * *', () => {
    // autoCountUser().then().catch()
    autoCountLp().then().catch()
  })
}

module.exports = startAuto
