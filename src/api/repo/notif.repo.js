const { Notification, UserFollowRoadmap } = require('../models')
const { NOTIF } = require('../constants')
const { notifService } = require('../services')
const { ObjectId } = require('mongoose').Types

const cmtRoadmapNotif = async (userCmt, roadmapId, roadmapOwner) => {
  const notif = new Notification({
    notifType: NOTIF.CMT_RM,
    from: userCmt,
    to: roadmapOwner,
    roadmap: roadmapId
  })
  return await notif.save()
}

const cmtLpNotif = async (userCmt, lpId, roadmapOwner) => {
  const notif = new Notification({
    notifType: NOTIF.CMT_LP,
    from: userCmt,
    to: roadmapOwner,
    learningPath: lpId
  })
  return await notif.save()
}

const addOutcomeRmNotif = async (roadmapId, roadmapOwner, content) => {
  const followers = await UserFollowRoadmap.find({ roadmap: roadmapId }).lean()
  const notifs = followers.map((follower) => ({
    notifType: NOTIF.ADD_RM_CL,
    from: roadmapOwner,
    to: follower.user,
    content,
    roadmap: roadmapId
  }))
  notifService.pushNotif({
    notifType: NOTIF.DONE_RM_CL,
    from: roadmapOwner,
    to: followers.map(flw => flw.user),
    roadmap: roadmapId
  }).then((res) => console.log(res.status))
  return await Notification.insertMany(notifs)
}

const doneOutcomeRmNotif = async (roadmapId, roadmapOwner, content) => {
  const followers = await UserFollowRoadmap.find({ roadmap: roadmapId }).lean()
  const notifs = followers.map((follower) => ({
    notifType: NOTIF.DONE_RM_CL,
    from: roadmapOwner,
    to: follower.user,
    content,
    roadmap: roadmapId
  }))
  notifService.pushNotif({
    notifType: NOTIF.DONE_RM_CL,
    from: roadmapOwner,
    to: followers.map(flw => flw.user),
    roadmap: roadmapId
  }).then((res) => console.log(res.status))
  return await Notification.insertMany(notifs)
}

const followRoadmapNotif = async (roadmapId, followerId, roadmapOwner) => {
  const notif = new Notification({
    notifType: NOTIF.FOLLOW_RM,
    from: followerId,
    to: roadmapOwner,
    roadmap: roadmapId
  })
  notifService.pushNotif({
    notifType: NOTIF.FOLLOW_RM,
    from: followerId,
    to: [roadmapOwner],
    roadmap: roadmapId
  }).then((res) => console.log(res.status))
  return await notif.save()
}

const starRmNotif = async (roadmapId, userStar, roadmapOwner) => {
  const notif = new Notification({
    notifType: NOTIF.STAR_RM,
    from: userStar,
    to: roadmapOwner,
    roadmap: roadmapId
  })
  return await notif.save()
}

const starLpNotif = async (learningPathId, userStar, roadmapOwner) => {
  const notif = new Notification({
    notifType: NOTIF.STAR_LP,
    from: userStar,
    to: roadmapOwner,
    learningPath: learningPathId
  })
  return await notif.save()
}

const seenNotif = async (notifId) => {
  return await Notification.findByIdAndUpdate(notifId, { seen: true }, { new: true })
}

const getNotifs = async (userId) => {
  const rs = await Notification.aggregate([
    {
      $match: { to: new ObjectId(userId) }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'from',
        foreignField: '_id',
        as: 'sender'
      }
    },
    {
      $lookup: {
        from: 'roadmaps',
        localField: 'roadmap',
        foreignField: 'id',
        as: 'roadmap'
      }
    },
    {
      $lookup: {
        from: 'learning-paths',
        localField: 'learningPath',
        foreignField: 'id',
        as: 'learningPath'
      }
    },
    {
      $unwind: { path: '$roadmap', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$sender', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$learningPath', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        'sender.name': 1,
        'sender.avatar': 1,
        'sender._id': 1,
        'roadmap.name': 1,
        'learningPath.name': 1,
        seen: 1,
        notifType: 1,
        createdAt: 1,
        content: 1
      }
    }
  ])
  return rs
}

module.exports = {
  cmtRoadmapNotif,
  cmtLpNotif,
  addOutcomeRmNotif,
  doneOutcomeRmNotif,
  followRoadmapNotif,
  starRmNotif,
  starLpNotif,
  seenNotif,
  getNotifs
}
