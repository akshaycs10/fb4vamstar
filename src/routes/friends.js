const friends = require('../models/friends.model');

/** 
  * sends a friend request to a user
  */
const sendFriendRequest = async (req, res) => {
    try {
        console.log('sendFriendRequest: req:', req.body);
        if (req.body.senderId === null || req.body.senderId === undefined || req.body.receiverId === null || req.body.receiverId === undefined)
            res.status(400).send({ Message: "Incomplete request parameters" });
            
        req.body.timestamp = new Date().toISOString();
        await friends.create(req.body);
        res.status(201).send();
    } catch (error) {
        console.error('sendFriendRequest error:', error);
        res.status(500).send();
    }
};

/**
 * fetch list of all friends for a user
 */
const getFriendsListForUser = async (req, res) => {
    try {
        console.log('getFriendsListForUser: req:', req.body);
        if (req.query.userId === null || req.query.userId === undefined )
            res.status(400).send({ Message: "Incomplete request parameters" });
        
        let friendsList = await friends.find( { $or:[ {'senderId': req.query.userId}, {'receiverId': req.query.userId} ]});
        res.status(201).send(friendsList);
    } catch (error) {
        console.error('getFriendsListForUser error:', error);
        res.status(500).send();
    }
};

/**
 * Add more friends routes here
 */
export {
    sendFriendRequest,
    getFriendsListForUser
};
