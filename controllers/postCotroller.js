const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const postColl = MongoClient.db("shadamon").collection("posts");

async function getPosts(req, res, next) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await postColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Posts loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load posts!" });
  }finally{
    next();
  }
}

async function addPost(req, res, next) {
  try {
    const post = req.body;
    const result = await postColl.insertOne(post);
    return res.status(200).send({ data: result, message: "Post created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create post" });
  }finally{
    next();
  }
}

async function deletePost(req, res, next) {
  try {
    const id = req.params.id;
    const result = await postColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted post!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the post!" });
  }finally{
    next();
  }
}

async function updatePost(req, res, next) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const post = req.body;
    const update = {
      $set: post,
    }

    const result = await postColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Post updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update post" })
  }finally{
    next();
  }
}

module.exports = {
  getPosts,
  addPost,
  deletePost,
  updatePost,
};
