const mongoose = require('mongoose');

const healthcareDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['diagnosis', 'drug_discovery', 'medical_imaging', 'patient_care', 'research'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  aiTechnology: {
    type: String,
    enum: ['GPT', 'CNN', 'RNN', 'Transformer', 'GAN', 'Other'],
    required: true
  },
  caseStudy: {
    hospitalName: String,
    location: String,
    patientsImpacted: Number,
    accuracyImprovement: Number,
    timeReduction: Number,
    costSavings: Number
  },
  benefits: [String],
  challenges: [String],
  ethicalConcerns: [String],
  implementationStatus: {
    type: String,
    enum: ['research', 'pilot', 'deployed', 'widespread'],
    default: 'research'
  },
  dataPrivacyMeasures: [String],
  biasConsiderations: String,
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

module.exports = mongoose.model('HealthcareData', healthcareDataSchema);
