const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: ObjectId,
      ref: 'user',
      required: true
    },
    to: {
      type: ObjectId,
      ref: 'user',
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      required: true,
      default: false
    }
  }
)
notificationSchema.indexes()
const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification
