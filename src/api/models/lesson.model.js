const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const { nanoid } = require('nanoid')

const lessonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid()
    },
    name: {
      type: String,
      required: true,
      index: true
    },
    content: {
      type: String
    },
    preparation: {
      type: String
    },
    description: {
      type: String
    },
    designedTime: {
      type: Number,
      required: true,
      default: 0
    },
    estimateTime: {
      type: Number,
      required: true,
      default: 0
    },
    outcomes: {
      type: String
    },
    lessonParts: [{
      type: ObjectId,
      required: true,
      ref: 'lesson-part'
    }],
    updateHistories: [{
      type: ObjectId,
      ref: 'lesson-update'
    }],
    comments: [{
      type: ObjectId,
      ref: 'comment'
    }],
    resources: [{
      type: Object
    }],
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
lessonSchema.indexes()
const Lesson = mongoose.model('lesson', lessonSchema)

module.exports = Lesson
