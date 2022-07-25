const mongoose = require('mongoose')

const AnalysisSchema = new mongoose.Schema(
  {
    totalLps: Number,
    timestamp: Date
  },
  {
    timeseries: {
      timeField: 'timestamp',
      granularity: 'minutes'
    }
  }
)

const AnalysisLp = mongoose.model('analysis-lp', AnalysisSchema)

module.exports = AnalysisLp
