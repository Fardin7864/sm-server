const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const notificationColl = MongoClient.db("shadamon").collection("notifications");

async function getNotifications(req, res, next) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await notificationColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Notifications loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load notifications!" });
  }finally{
    next();
  }
}

async function addNotification(req, res, next) {
  try {
    const notification = req.body;
    const result = await notificationColl.insertOne(notification);
    return res.status(200).send({ data: result, message: "Notification created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create notification" });
  }finally{
    next();
  }
}

async function deleteNotification(req, res, next) {
  try {
    const id = req.params.id;
    const result = await notificationColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted notification!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the notification!" });
  }finally{
    next();
  }
}

async function updateNotification(req, res, next) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const notification = req.body;
    const update = {
      $set: notification,
    }

    const result = await notificationColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Notification updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update notification" })
  }finally{
    next();
  }
}

module.exports = {
  getNotifications,
  addNotification,
  deleteNotification,
  updateNotification,
};
