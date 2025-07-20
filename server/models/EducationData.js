const mongoose = require('mongoose');

const educationDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['personalized_learning', 'content_creation', 'assessment', 'tutoring', 'accessibility'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  aiTechnology: {
    type: String,
    enum: ['NLP', 'ML', 'Deep_Learning', 'Computer_Vision', 'Recommendation_Systems', 'Other'],
    required: true
  },
  caseStudy: {
    institutionName: String,
    location: String,
    studentsImpacted: Number,
    learningImprovement: Number,
    engagementIncrease: Number,
    teacherWorkloadReduction: Number
  },
  benefits: [String],
  challenges: [String],
  ethicalConcerns: [String],
  implementationStatus: {
    type: String,
    enum: ['research', 'pilot', 'deployed', 'widespread'],
    default: 'research'
  },
  accessibilityFeatures: [String],
  personalizationLevel: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced'],
    default: 'basic'
  },
  targetAudience: {
    type: String,
    enum: ['primary', 'secondary', 'higher_education', 'professional', 'all'],
    default: 'all'
  },
  subjects: [String],
  futureProspects: String,
  references: [String],
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EducationData', educationDataSchema);
