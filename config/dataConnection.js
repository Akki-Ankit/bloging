const mongoose = require("mongoose");

const { URI } = require("../utils/envconfig");

// Establish a database connection
async function dbConnection() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(URI);

    console.log("Database Connected");
  } catch (error) {
    console.log("Database Not Connected");
  }
}

// Export the dbConnection function as dbConnect
module.exports = {
  dbConnect: dbConnection,
};
