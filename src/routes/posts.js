const post = require('../models/posts.model');
/** 
  * adds a post for a user
  */
const createPost = async (req, res) => {
    try {
        console.log('createPost: req:', req.body);
        if ((req.body.text != null || req.body.text != undefined) || req.body.imageUrl) {
            req.body.timestamp = new Date().toISOString();
            await post.create(req.body);
        }
        else
            res.status(400).send({ Message: "Incomplete request parameters" });

        res.status(201).send();
    } catch (error) {
        console.error('onLike error:', error);
        res.status(500).send();
    }
};

/** 
  * fetch all posts for a user
  */
const getAllPostForUser = async (req, res) => {
    try {
        console.log('getAllPostForUser: req:', req.body);
        if (req.query.userId == null || req.query.userId == undefined)
            res.status(400).send({ Message: "Incomplete request parameters" });

        let postResp = await post.find({ "userId": req.query.userId });
        res.status(201).send(postResp);
    } catch (error) {
        console.error('getAllPostForUser error:', error);
        res.status(500).send();
    }
};

/**
 * Add more posts routes here
 */
export {
    createPost,
    getAllPostForUser
};
