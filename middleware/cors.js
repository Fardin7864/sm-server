const cors = require("cors");

module.exports = cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
});
