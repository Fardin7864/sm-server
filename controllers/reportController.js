const { MongoClient } = require("../config/database.js");
const { ObjectId } = require('mongodb');

const reportColl = MongoClient.db("shadamon").collection("reports");

async function getReports(req, res, next) {
  try {
    const id = req.query.id;
    const query = {};
    if (id) query._id = new ObjectId(id);
    const result = await reportColl.find(query).toArray();
    return res.status(200).send({ data: result, message: "Reports loaded successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error, message: "Failed to load reports!" });
  }finally{
    next();
  }
}

async function addReport(req, res, next) {
  try {
    const report = req.body;
    const result = await reportColl.insertOne(report);
    return res.status(200).send({ data: result, message: "Report created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create report" });
  }finally{
    next();
  }
}

async function deleteReport(req, res, next) {
  try {
    const id = req.params.id;
    const result = await reportColl.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({ data: result, message: "Successfully deleted report!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Failed to delete the report!" });
  }finally{
    next();
  }
}

async function updateReport(req, res, next) {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const report = req.body;
    const update = {
      $set: report,
    }

    const result = await reportColl.updateOne(query, update);
    res.status(200).send({ data: result, message: "Report updated successfully!" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Failed to update report" })
  }finally{
    next();
  }
}

module.exports = {
  getReports,
  addReport,
  deleteReport,
  updateReport,
};
