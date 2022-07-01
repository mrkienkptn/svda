const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    lessons: [{
      type: ObjectId,
      ref: 'lesson'
    }]
  }
)
partSchema.indexes()
const Part = mongoose.model('part', partSchema)

module.exports = Part
