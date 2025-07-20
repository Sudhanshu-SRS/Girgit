const express = require('express');
const EducationData = require('../models/EducationData');
const auth = require('../middleware/auth');

const router = express.Router();

// Get education analytics (must be before /:id route)
router.get('/analytics/overview', async (req, res) => {
  try {
    const totalEntries = await EducationData.countDocuments();
    
    const categoryCounts = await EducationData.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const technologyCounts = await EducationData.aggregate([
      { $group: { _id: '$aiTechnology', count: { $sum: 1 } } }
    ]);

    const audienceCounts = await EducationData.aggregate([
      { $group: { _id: '$targetAudience', count: { $sum: 1 } } }
    ]);

    res.json({
      totalEntries,
      categoryCounts,
      technologyCounts,
      audienceCounts
    });
  } catch (error) {
    console.error('Education analytics error:', error);
    res.status(500).json({ message: 'Error fetching education analytics', error: error.message });
  }
});

// Get all education data
router.get('/', async (req, res) => {
  try {
    const { category, technology, status, audience, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (technology) query.aiTechnology = technology;
    if (status) query.implementationStatus = status;
    if (audience) query.targetAudience = audience;

    const skip = (page - 1) * limit;
    
    const educationData = await EducationData.find(query)
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await EducationData.countDocuments(query);

    res.json({
      data: educationData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + educationData.length < total
      }
    });
  } catch (error) {
    console.error('Get education data error:', error);
    res.status(500).json({ message: 'Error fetching education data', error: error.message });
  }
});

// Get single education data entry
router.get('/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const educationData = await EducationData.findById(req.params.id)
      .populate('createdBy', 'name email role');
    
    if (!educationData) {
      return res.status(404).json({ message: 'Education data not found' });
    }

    res.json(educationData);
  } catch (error) {
    console.error('Get education data error:', error);
    res.status(500).json({ message: 'Error fetching education data', error: error.message });
  }
});

// Create education data (protected)
router.post('/', auth, async (req, res) => {
  try {
    const educationData = new EducationData({
      ...req.body,
      createdBy: req.user.userId
    });

    await educationData.save();
    await educationData.populate('createdBy', 'name email role');

    res.status(201).json({
      message: 'Education data created successfully',
      data: educationData
    });
  } catch (error) {
    console.error('Create education data error:', error);
    res.status(500).json({ message: 'Error creating education data', error: error.message });
  }
});

// Update education data (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const educationData = await EducationData.findById(req.params.id);
    
    if (!educationData) {
      return res.status(404).json({ message: 'Education data not found' });
    }

    // Check if user owns this data or is admin
    if (educationData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this data' });
    }

    const updatedData = await EducationData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role');

    res.json({
      message: 'Education data updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Update education data error:', error);
    res.status(500).json({ message: 'Error updating education data', error: error.message });
  }
});

// Delete education data (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const educationData = await EducationData.findById(req.params.id);
    
    if (!educationData) {
      return res.status(404).json({ message: 'Education data not found' });
    }

    // Check if user owns this data or is admin
    if (educationData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this data' });
    }

    await EducationData.findByIdAndDelete(req.params.id);

    res.json({ message: 'Education data deleted successfully' });
  } catch (error) {
    console.error('Delete education data error:', error);
    res.status(500).json({ message: 'Error deleting education data', error: error.message });
  }
});

module.exports = router;
