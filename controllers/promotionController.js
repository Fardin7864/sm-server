const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const promotionColl = MongoClient.db("shadamon").collection("promotions");

async function getPromotions(req, res) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await promotionColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Promotions loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load promotions!" });
  }
}

async function addPromotion(req, res) {
  try {
    const promotion = req.body;
    const result = await promotionColl.insertOne(promotion);
    return res.status(200).send({ data: result, message: "Promotion created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create promotion" });
  }
}

async function deletePromotion(req, res) {
  try {
    const id = req.params.id;
    const result = await promotionColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted promotion!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the promotion!" });
  }
}

async function updatePromotion(req, res) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const promotion = req.body;
    const update = {
      $set: promotion,
    }

    const result = await promotionColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Promotion updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update promotion" })
  }
}

module.exports = {
  getPromotions,
  addPromotion,
  deletePromotion,
  updatePromotion,
};
