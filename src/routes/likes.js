const like = require('../models/like.model');
const activity = require('../models/activity.model');
/** 
  * add like for post/comment
  */
const onLike = async (req, res) => {
  try {
    console.log('onLike: req:', req.body);
    let reqParams = req.body;
    if ((reqParams.activityId === null || reqParams.activityId === undefined) || (reqParams.userId === null || reqParams.userId === undefined))
      res.status(400).send({ Message: "Incomplete request parameters" });

    reqParams.timestamp = new Date().toISOString();
    await like.create(reqParams);
    let activityRes = await activity.findOne({ "activityId": reqParams.activityId });
    if (activityRes === null)
      await activity.create({ likes: 1, activityId: reqParams.activityId });
    else
      await activity.findOneAndUpdate({ likes: activityRes.likes + 1, activityId: reqParams.activityId });

    res.status(201).send();
  } catch (error) {
    console.error('onLike error:', error);
    res.status(500).send();
  }
};

/** 
  * fetch count(likes) on post/comment
  */
const getAllLikes = async (req, res) => {
  try {
    console.log('getAllLikes: req:', req.query);
    if (req.query.activityId === null || req.query.activityId === undefined)
      res.status(400).send({ Message: "Incomplete request parameters" });

    let resp = await activity.findOne({ "activityId": req.query.activityId });
    res.status(201).send({ "No of likes:": resp.likes });
  } catch (error) {
    console.error('getAllLikes error:', error);
    res.status(500).send();
  }
};

/**
 * Add more like routes here
 */
export {
  onLike,
  getAllLikes
};
