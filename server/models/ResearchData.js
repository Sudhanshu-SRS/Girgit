const mongoose = require('mongoose');

const researchDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  authors: [{
    name: String,
    affiliation: String,
    email: String
  }],
  keywords: [String],
  methodology: {
    type: String,
    enum: ['qualitative', 'quantitative', 'mixed_methods', 'systematic_review', 'meta_analysis'],
    required: true
  },
  dataCollection: {
    sources: [String],
    sampleSize: Number,
    timeframe: String,
    location: String
  },
  findings: {
    keyResults: [String],
    statisticalSignificance: Boolean,
    limitations: [String],
    implications: [String]
  },
  aiApplications: {
    healthcare: [{
      application: String,
      effectiveness: Number,
      adoptionRate: Number
    }],
    education: [{
      application: String,
      effectiveness: Number,
      adoptionRate: Number
    }]
  },
  ethicalConsiderations: {
    dataPrivacy: String,
    biasMitigation: String,
    transparency: String,
    accountability: String
  },
  futureDirections: [String],
  references: [String],
  status: {
    type: String,
    enum: ['draft', 'under_review', 'published', 'rejected'],
    default: 'draft'
  },
  publicationDate: Date,
  journal: String,
  doi: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResearchData', researchDataSchema);
