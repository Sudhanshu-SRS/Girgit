require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const checkUsers = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb+srv://sudhanshusakhare808:Sudhanshu12@girgitr-11.slvbksc.mongodb.net/";
    console.log("Connecting to MongoDB...", mongoUri.substring(0, 30) + "...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const users = await User.find({}, "name email role");
    console.log("\nExisting users in database:");

    if (users.length === 0) {
      console.log("No users found in database");
    } else {
      users.forEach((user) => {
        console.log(
          `- Name: ${user.name}, Email: '${user.email}', Role: ${user.role}`
        );
      });
    }

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

checkUsers();
