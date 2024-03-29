// eslint-disable-next-line no-global-assign
Promise = require('bluebird')

const { port, env } = require('./config/vars')
const logger = require('./config/logger')
const app = require('./config/express')
const mongoose = require('./config/mongoose')
// const { startAuto } = require('./api/auto')
mongoose.connect() // ensure connected

// listen to requests
app.listen(port, () => logger.info(`[Server] started on port ${port} (${env})`))

/**
 * Exports express
 * @public
 */
// startAuto()
module.exports = app
