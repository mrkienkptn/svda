const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const { nanoid } = require('nanoid')

const roadmapSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(10)
    },
    stars: [{
      type: String
    }],
    category: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String
    },
    ownerId: {
      type: ObjectId,
      ref: 'user'
    },
    name: {
      type: String,
      required: true
    },
    outcomes: [{
      type: Object
    }],
    designedTime: {
      type: Number
    },
    steps: [{
      type: ObjectId,
      ref: 'roadmap-step'
    }],
    forkFrom: {
      type: String
    },
    allowClone: {
      type: Boolean,
      default: true
    },
    totalStep: {
      type: Number,
      default: 0
    },
    completedStep: {
      type: Number,
      default: 0
    },
    comments: [{
      type: ObjectId,
      ref: 'comment'
    }]
  }
)
roadmapSchema.indexes()
const LearningPath = mongoose.model('roadmap', roadmapSchema)

module.exports = LearningPath
