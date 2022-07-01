const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const { nanoid } = require('nanoid')

const learningPathSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(10)
    },
    stars: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String
    },
    ownerType: { // student / teacher / organization
      type: String,
      required: true
    },
    ownerId: {
      type: ObjectId,
      ref: 'user'
    },
    name: {
      type: String,
      required: true
    },
    outcomes: {
      type: String
    },
    public: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number
    },
    parts: [{
      type: ObjectId,
      ref: 'part'
    }],
    rubrics: [{
      type: ObjectId,
      ref: 'rubric'
    }],
    forkFrom: {
      type: String
    },
    allowClone: {
      type: Boolean,
      default: true
    },
    totalActions: {
      type: Number,
      default: 0
    },
    completedActions: {
      type: Number,
      default: 0
    }
  }
)
learningPathSchema.indexes()
const LearningPath = mongoose.model('learning-path', learningPathSchema)

module.exports = LearningPath
