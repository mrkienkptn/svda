const mongoose = require('mongoose')

const roadmapStepSchema = new mongoose.Schema(
  {
    completed: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Required', 'Optional']
    },
    outcomes: [{
      type: Object
    }],
    checklist: {
      type: Object
    },
    startDate: {
      type: Date
    },
    finishDate: {
      type: Date
    },
    notify: {
      type: Boolean,
      default: true
    },
    resources: [{
      type: Object
    }]
  },
  {
    timestamps: true
  }
)
roadmapStepSchema.indexes()
const RoadmapStep = mongoose.model('roadmap-step', roadmapStepSchema)

module.exports = RoadmapStep
