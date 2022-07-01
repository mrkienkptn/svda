const mongoose = require('mongoose')

const AnalysisSchema = new mongoose.Schema(
  {
    users: {
      type: Number
    },
    lps: {
      type: Number
    },
    timestamp: {
      type: Date
    }
  },
  {
    timeseries: {
      timeField: 'timestamp',
      granularity: 'minutes'
    },
    autoCreate: false,
    autoIndex: false
  }
)

const Analysis = mongoose.model('analysis', AnalysisSchema)

module.exports = Analysis
