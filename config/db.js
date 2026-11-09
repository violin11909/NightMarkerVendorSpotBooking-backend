const mongoose = require("mongoose");
const dns = require("node:dns");

// Use public DNS resolvers for MongoDB Atlas SRV lookups.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
