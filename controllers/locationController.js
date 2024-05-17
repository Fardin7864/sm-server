const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const locationColl = MongoClient.db("shadamon").collection("locations");

async function getLocations(req, res, next) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await locationColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Locations loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load locations!" });
  }finally{
    next();
  }
}

async function addLocation(req, res, next) {
  try {
    const location = req.body;
    const result = await locationColl.insertOne(location);
    return res.status(200).send({ data: result, message: "Location created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create location" });
  }finally{
    next();
  }
}

async function deleteLocation(req, res, next) {
  try {
    const id = req.params.id;
    const result = await locationColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted location!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the location!" });
  }finally{
    next();
  }
}

async function updateLocation(req, res, next) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const location = req.body;
    const update = {
      $set: location,
    }

    const result = await locationColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Location updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update location" })
  }finally{
    next();
  }
}

module.exports = {
  getLocations,
  addLocation,
  deleteLocation,
  updateLocation,
};
