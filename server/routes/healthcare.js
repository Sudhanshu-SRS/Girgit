const express = require('express');
const HealthcareData = require('../models/HealthcareData');
const auth = require('../middleware/auth');

const router = express.Router();

// Get healthcare analytics (must be before /:id route)
router.get('/analytics/overview', async (req, res) => {
  try {
    const totalEntries = await HealthcareData.countDocuments();
    
    const categoryCounts = await HealthcareData.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const technologyCounts = await HealthcareData.aggregate([
      { $group: { _id: '$aiTechnology', count: { $sum: 1 } } }
    ]);

    const statusCounts = await HealthcareData.aggregate([
      { $group: { _id: '$implementationStatus', count: { $sum: 1 } } }
    ]);

    res.json({
      totalEntries,
      categoryCounts,
      technologyCounts,
      statusCounts
    });
  } catch (error) {
    console.error('Healthcare analytics error:', error);
    res.status(500).json({ message: 'Error fetching healthcare analytics', error: error.message });
  }
});

// Get all healthcare data
router.get('/', async (req, res) => {
  try {
    const { category, technology, status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (technology) query.aiTechnology = technology;
    if (status) query.implementationStatus = status;

    const skip = (page - 1) * limit;
    
    const healthcareData = await HealthcareData.find(query)
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await HealthcareData.countDocuments(query);

    res.json({
      data: healthcareData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + healthcareData.length < total
      }
    });
  } catch (error) {
    console.error('Get healthcare data error:', error);
    res.status(500).json({ message: 'Error fetching healthcare data', error: error.message });
  }
});

// Get single healthcare data entry
router.get('/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const healthcareData = await HealthcareData.findById(req.params.id)
      .populate('createdBy', 'name email role');
    
    if (!healthcareData) {
      return res.status(404).json({ message: 'Healthcare data not found' });
    }

    res.json(healthcareData);
  } catch (error) {
    console.error('Get healthcare data error:', error);
    res.status(500).json({ message: 'Error fetching healthcare data', error: error.message });
  }
});

// Create healthcare data (protected)
router.post('/', auth, async (req, res) => {
  try {
    const healthcareData = new HealthcareData({
      ...req.body,
      createdBy: req.user.userId
    });

    await healthcareData.save();
    await healthcareData.populate('createdBy', 'name email role');

    res.status(201).json({
      message: 'Healthcare data created successfully',
      data: healthcareData
    });
  } catch (error) {
    console.error('Create healthcare data error:', error);
    res.status(500).json({ message: 'Error creating healthcare data', error: error.message });
  }
});

// Update healthcare data (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const healthcareData = await HealthcareData.findById(req.params.id);
    
    if (!healthcareData) {
      return res.status(404).json({ message: 'Healthcare data not found' });
    }

    // Check if user owns this data or is admin
    if (healthcareData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this data' });
    }

    const updatedData = await HealthcareData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role');

    res.json({
      message: 'Healthcare data updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Update healthcare data error:', error);
    res.status(500).json({ message: 'Error updating healthcare data', error: error.message });
  }
});

// Delete healthcare data (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const healthcareData = await HealthcareData.findById(req.params.id);
    
    if (!healthcareData) {
      return res.status(404).json({ message: 'Healthcare data not found' });
    }

    // Check if user owns this data or is admin
    if (healthcareData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this data' });
    }

    await HealthcareData.findByIdAndDelete(req.params.id);

    res.json({ message: 'Healthcare data deleted successfully' });
  } catch (error) {
    console.error('Delete healthcare data error:', error);
    res.status(500).json({ message: 'Error deleting healthcare data', error: error.message });
  }
});

module.exports = router;
