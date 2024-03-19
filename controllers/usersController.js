const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');


const userColl = MongoClient.db("shadamon").collection("users");

async function getUsers(req, res) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);

    const result = await userColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Users loaded successfully!" });
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    return res.status(500).send({error: error, message: "Failed to load users!" });
  }
}



async function addUser(req, res) {
  try {
    const user = req.body;

    // const exist = await userColl.findOne(user.username);
    // if (exist)
    //   return res.status(402).send({ message: "This number already registered!" });
    const result = await userColl.insertOne(user);
    return res.status(200).send({ data: result, message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create user" });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await userColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted user!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({error: error, message: "Failed to delete the user!" });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const user = req.body;
    const update = {
      $set: user,
    }

    const result = await userColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Update successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update user" })
  }
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
