const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const chatColl = MongoClient.db("shadamon").collection("messages");


async function getMessages(req, res) {
    try {
      const reciverId = req.query.reciverId;
      const userId = req.params.id;
      const query = {};
      if (reciverId) query.reciverId = new ObjectId(reciverId);
      if (userId) query._id = new ObjectId(userId);
      const result = await chatColl.find(query).toArray();
      return res.status(200).send({ data: result, message: "Message loaded successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error, message: "Failed to load posts!" });
    }
  }
  
async function postMessage (req,res) { 
    try {
        const message = req.body;
        const result = await chatColl.insertOne(message);
        res.status(200).send({ data: result, message: "Successfully send message!" });
    } catch (error) {
        return res.status(500).send({ error: error, message: "Failed to Post message!" });
    }
 }

 module.exports = {
    getMessages,
    postMessage,
  };
  