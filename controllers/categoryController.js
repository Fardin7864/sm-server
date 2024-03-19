const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const categoryColl = MongoClient.db("shadamon").collection("categories");

async function getCategories(req, res) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await categoryColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Categories loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load categories!" });
  }
}

async function addCategory(req, res) {
  try {
    const category = req.body;
    const result = await categoryColl.insertOne(category);
    return res.status(200).send({ data: result, message: "Category created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create category" });
  }
}

async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    const result = await categoryColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted category!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the category!" });
  }
}

async function updateCategory(req, res) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const category = req.body;
    const update = {
      $set: category,
    }

    const result = await categoryColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Category updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update category" })
  }
}

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
