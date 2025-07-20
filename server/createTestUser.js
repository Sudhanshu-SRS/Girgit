require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const HealthcareData = require("./models/HealthcareData");
const EducationData = require("./models/EducationData");
const ResearchData = require("./models/ResearchData");

const fixDatabase = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    
    // Use the correct MongoDB URI
    const mongoUri = process.env.MONGODB_URI || 
      "mongodb+srv://sudhanshusakhare808:Sudhanshu12@girgitr-11.slvbksc.mongodb.net/generative-ai-app";
    
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear all collections
    console.log("🗑️ Clearing all collections...");
    await User.deleteMany({});
    await HealthcareData.deleteMany({});
    await EducationData.deleteMany({});
    await ResearchData.deleteMany({});
    console.log("✅ All collections cleared");

    // Create admin user
    console.log("👤 Creating admin user...");
    const adminUser = new User({
      name: "Dr. Gargee Purwar",
      email: "gargee.purwar@example.com",
      password: "password123", // This will be hashed automatically
      role: "admin",
      profile: {
        institution: "Tech University",
        specialization: "Artificial Intelligence",
        yearsOfExperience: 15,
        researchInterests: ["Machine Learning", "Natural Language Processing"]
      }
    });

    await adminUser.save();
    console.log("✅ Admin user created:", adminUser.email);

    // Create test user
    console.log("👤 Creating test user...");
    const testUser = new User({
      name: "John Student",
      email: "john.student@university.edu",
      password: "student123",
      role: "student",
      profile: {
        institution: "State University",
        specialization: "Computer Science",
        yearsOfExperience: 0,
        researchInterests: ["AI Applications", "Data Science"]
      }
    });

    await testUser.save();
    console.log("✅ Test user created:", testUser.email);

    // Verify users were created
    const userCount = await User.countDocuments();
    console.log(`✅ Total users in database: ${userCount}`);

    // List all users
    const users = await User.find({}, 'name email role');
    console.log("📋 Users in database:");
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });

    await mongoose.connection.close();
    console.log("🔐 Database connection closed");
    console.log("\n🎉 Database setup complete!");
    console.log("\nYou can now login with:");
    console.log("Email: gargee.purwar@example.com");
    console.log("Password: password123");
    console.log("\nOr:");
    console.log("Email: john.student@university.edu");
    console.log("Password: student123");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

fixDatabase();