const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const lessonPartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    learningActions: [{
      type: ObjectId,
      ref: 'learning-action'
    }]
  }
)
lessonPartSchema.indexes()
const LessonPart = mongoose.model('lesson-part', lessonPartSchema)

module.exports = LessonPart
