require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const clearAndSeed = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb+srv://sudhanshusakhare808:Sudhanshu12@girgitr-11.slvbksc.mongodb.net/";

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing users
    console.log("🗑️ Clearing existing users...");
    const deleteResult = await User.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing users`);

    // Create new users
    console.log("👥 Creating new users...");
    const users = [
      {
        name: "Dr. Gargee Purwar",
        email: "gargee.purwar@example.com",
        password: "admin123",
        role: "admin",
        profile: {
          institution: "Tech University",
          specialization: "Artificial Intelligence",
          yearsOfExperience: 15,
          researchInterests: [
            "Machine Learning",
            "Natural Language Processing",
            "Computer Vision",
          ],
        },
      },
      {
        name: "John Student",
        email: "john.student@university.edu",
        password: "student123",
        role: "student",
        profile: {
          institution: "State University",
          specialization: "Computer Science",
          yearsOfExperience: 0,
          researchInterests: ["AI Applications", "Data Science"],
        },
      },
      {
        name: "Dr. Jane Researcher",
        email: "jane.researcher@institute.org",
        password: "researcher123",
        role: "researcher",
        profile: {
          institution: "Research Institute",
          specialization: "Healthcare AI",
          yearsOfExperience: 8,
          researchInterests: [
            "Medical AI",
            "Diagnostic Systems",
            "Healthcare Analytics",
          ],
        },
      },
    ];

    console.log("Creating users...");
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✓ Created user: ${user.email}`);
    }

    console.log("\n✅ Database seeded successfully");
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

clearAndSeed();
