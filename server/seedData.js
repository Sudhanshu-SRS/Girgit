const mongoose = require("mongoose");
const dotenv = require("dotenv");
const HealthcareData = require("./models/HealthcareData");
const EducationData = require("./models/EducationData");
const ResearchData = require("./models/ResearchData");
const User = require("./models/User");

dotenv.config();

// Sample healthcare data
const healthcareData = [
  {
    title: "AI-Powered Radiology Diagnosis",
    category: "diagnosis",
    description:
      "Deep learning models for early detection of lung cancer in chest X-rays with 95% accuracy.",
    aiTechnology: "CNN",
    caseStudy: {
      hospitalName: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      patientsImpacted: 5000,
      accuracyImprovement: 15,
      timeReduction: 40,
      costSavings: 250000,
    },
    benefits: [
      "Early cancer detection",
      "Reduced radiologist workload",
      "Faster diagnosis time",
      "Improved patient outcomes",
    ],
    challenges: [
      "Data quality requirements",
      "Integration with existing systems",
      "Training requirements",
    ],
    ethicalConcerns: ["Data privacy", "Algorithm bias", "Over-reliance on AI"],
    implementationStatus: "deployed",
    dataPrivacyMeasures: [
      "HIPAA compliance",
      "Data encryption",
      "Access controls",
    ],
    biasConsiderations:
      "Diverse training dataset to minimize racial and gender bias",
    futureProspects: "Integration with real-time monitoring systems",
    references: ["Medical AI Journal 2024", "Healthcare Technology Review"],
    tags: ["radiology", "cancer", "deep-learning"],
  },
  {
    title: "Drug Discovery AI Platform",
    category: "drug_discovery",
    description:
      "Generative AI for identifying novel drug compounds and predicting their effectiveness.",
    aiTechnology: "Transformer",
    caseStudy: {
      hospitalName: "Pfizer Research Center",
      location: "New York, NY",
      patientsImpacted: 0,
      accuracyImprovement: 60,
      timeReduction: 70,
      costSavings: 2000000,
    },
    benefits: [
      "Accelerated drug discovery",
      "Reduced development costs",
      "Novel compound identification",
      "Improved success rates",
    ],
    challenges: [
      "Regulatory approval",
      "Clinical trial requirements",
      "High computational costs",
    ],
    implementationStatus: "pilot",
    tags: ["drug-discovery", "pharmaceutical", "ai-research"],
  },
];

// Sample education data
const educationData = [
  {
    title: "Personalized Learning AI Tutor",
    category: "personalized_learning",
    description:
      "AI-powered tutoring system that adapts to individual learning styles and pace.",
    aiTechnology: "ML",
    caseStudy: {
      institutionName: "MIT OpenCourseWare",
      location: "Cambridge, MA",
      studentsImpacted: 10000,
      learningImprovement: 35,
      engagementIncrease: 50,
      teacherWorkloadReduction: 30,
    },
    benefits: [
      "Personalized learning paths",
      "24/7 availability",
      "Immediate feedback",
      "Adaptive content delivery",
    ],
    challenges: [
      "Technology adoption",
      "Internet connectivity requirements",
      "Teacher training needs",
    ],
    implementationStatus: "deployed",
    accessibilityFeatures: [
      "Screen reader support",
      "Multiple language support",
      "Adjustable content difficulty",
    ],
    personalizationLevel: "advanced",
    targetAudience: "higher_education",
    subjects: ["Mathematics", "Computer Science", "Physics"],
    tags: ["personalized-learning", "tutoring", "adaptive"],
  },
  {
    title: "Automated Essay Grading System",
    category: "assessment",
    description:
      "Natural language processing system for automated essay scoring and feedback generation.",
    aiTechnology: "NLP",
    caseStudy: {
      institutionName: "Stanford University",
      location: "Stanford, CA",
      studentsImpacted: 3000,
      learningImprovement: 25,
      engagementIncrease: 20,
      teacherWorkloadReduction: 60,
    },
    benefits: [
      "Instant feedback",
      "Consistent grading",
      "Detailed writing analysis",
      "Time savings for educators",
    ],
    implementationStatus: "widespread",
    targetAudience: "all",
    subjects: ["English", "Literature", "Writing"],
    tags: ["assessment", "nlp", "automated-grading"],
  },
];

// Sample research data
const researchData = [
  {
    title: "Impact of AI on Healthcare Efficiency",
    abstract:
      "Comprehensive study on how AI implementations affect healthcare delivery efficiency and patient outcomes.",
    authors: [
      {
        name: "Dr. Sarah Johnson",
        affiliation: "Harvard Medical School",
        email: "sarah.johnson@harvard.edu",
      },
      {
        name: "Dr. Michael Chen",
        affiliation: "Stanford AI Lab",
        email: "mchen@stanford.edu",
      },
    ],
    keywords: [
      "healthcare AI",
      "efficiency",
      "patient outcomes",
      "implementation",
    ],
    methodology: "mixed_methods",
    dataCollection: {
      sources: ["Hospital records", "Survey data", "Interview transcripts"],
      sampleSize: 500,
      timeframe: "January 2023 - December 2023",
      location: "United States",
    },
    findings: {
      keyResults: [
        "40% improvement in diagnostic accuracy",
        "30% reduction in treatment time",
        "25% decrease in healthcare costs",
        "Higher patient satisfaction scores",
      ],
      statisticalSignificance: true,
      limitations: [
        "Limited to urban hospitals",
        "Short study duration",
        "Technology adoption variability",
      ],
      implications: [
        "Need for standardized AI implementation",
        "Importance of staff training",
        "Potential for widespread adoption",
      ],
    },
    aiApplications: {
      healthcare: [
        {
          application: "Diagnostic imaging",
          effectiveness: 95,
          adoptionRate: 60,
        },
        {
          application: "Drug discovery",
          effectiveness: 80,
          adoptionRate: 30,
        },
      ],
      education: [
        {
          application: "Personalized learning",
          effectiveness: 85,
          adoptionRate: 45,
        },
      ],
    },
    ethicalConsiderations: {
      dataPrivacy: "Strict HIPAA compliance maintained throughout study",
      biasMitigation: "Diverse dataset collection to minimize algorithmic bias",
      transparency: "Open methodology and code availability",
      accountability: "Clear responsibility chains for AI decisions",
    },
    futureDirections: [
      "Long-term impact studies",
      "Rural healthcare applications",
      "Integration with wearable devices",
      "Cross-cultural implementation analysis",
    ],
    status: "published",
    publicationDate: new Date("2024-01-15"),
    journal: "Journal of Medical AI",
    doi: "10.1000/182",
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/generative-ai-app"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
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

    console.log("Seeding users...");
    for (const userData of users) {
      await User.findOneAndUpdate({ email: userData.email }, userData, {
        upsert: true,
        new: true,
      });
      console.log(`Upserted user: ${userData.email}`);
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const seedDatabase = async () => {
  await connectDB();
  await seedUsers();
  await mongoose.connection.close();
  console.log("Database connection closed");
};

// Run the seeding script if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
