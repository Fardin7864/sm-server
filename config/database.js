const { MongoClient, ServerApiVersion } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://fardin18:hamba78@cluster0.7k1zdza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  MongoClient: client,
  ObjectId: MongoClient.ObjectId,
};
