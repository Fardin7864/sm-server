const cors = require("cors");

module.exports = cors({
  origin: ['http://localhost:3000', 'https://shada-m-client.vercel.app'],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
});
