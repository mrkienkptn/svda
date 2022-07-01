const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    admin: {
      type: ObjectId,
      required: true,
      ref: 'user'
    },
    description: {
      type: String
    },
    learningPaths: [{
      type: ObjectId,
      ref: 'learning-path'
    }],
    ogzType: {
      type: String,
      required: true
    }
  }
)

const Organization = mongoose.model('organization', organizationSchema)

module.exports = Organization
