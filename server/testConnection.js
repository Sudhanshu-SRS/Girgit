const mongoose = require("mongoose");

const testConnection = async () => {
  try {
    console.log("Testing MongoDB connection...");
    const mongoUri =
      "mongodb+srv://sudhanshusakhare808:Sudhanshu12@girgitr-11.slvbksc.mongodb.net/";

    await mongoose.connect(mongoUri);
    console.log("✅ Successfully connected to MongoDB");

    // List collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📁 Available collections:",
      collections.map((c) => c.name)
    );

    await mongoose.connection.close();
    console.log("🔐 Connection closed");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
};

testConnection();
