const express = require('express');
const ResearchData = require('../models/ResearchData');
const auth = require('../middleware/auth');

const router = express.Router();

// Get research analytics (must be before /:id route)
router.get('/analytics/overview', async (req, res) => {
  try {
    const totalEntries = await ResearchData.countDocuments();
    
    const methodologyCounts = await ResearchData.aggregate([
      { $group: { _id: '$methodology', count: { $sum: 1 } } }
    ]);

    const statusCounts = await ResearchData.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const keywordCounts = await ResearchData.aggregate([
      { $unwind: '$keywords' },
      { $group: { _id: '$keywords', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalEntries,
      methodologyCounts,
      statusCounts,
      keywordCounts
    });
  } catch (error) {
    console.error('Research analytics error:', error);
    res.status(500).json({ message: 'Error fetching research analytics', error: error.message });
  } 
});

// Get all research data
router.get('/', async (req, res) => {
  try {
    const { methodology, status, keyword, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (methodology) query.methodology = methodology;
    if (status) query.status = status;
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { abstract: { $regex: keyword, $options: 'i' } },
        { keywords: { $in: [new RegExp(keyword, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const researchData = await ResearchData.find(query)
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ResearchData.countDocuments(query);

    res.json({
      data: researchData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + researchData.length < total
      }
    });
  } catch (error) {
    console.error('Get research data error:', error);
    res.status(500).json({ message: 'Error fetching research data', error: error.message });
  }
});

// Get single research data entry
router.get('/:id', async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const researchData = await ResearchData.findById(req.params.id)
      .populate('createdBy', 'name email role');
    
    if (!researchData) {
      return res.status(404).json({ message: 'Research data not found' });
    }

    res.json(researchData);
  } catch (error) {
    console.error('Get research data error:', error);
    res.status(500).json({ message: 'Error fetching research data', error: error.message });
  }
});

// Create research data (protected)
router.post('/', auth, async (req, res) => {
  try {
    const researchData = new ResearchData({
      ...req.body,
      createdBy: req.user.userId
    });

    await researchData.save();
    await researchData.populate('createdBy', 'name email role');

    res.status(201).json({
      message: 'Research data created successfully',
      data: researchData
    });
  } catch (error) {
    console.error('Create research data error:', error);
    res.status(500).json({ message: 'Error creating research data', error: error.message });
  }
});

// Update research data (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const researchData = await ResearchData.findById(req.params.id);
    
    if (!researchData) {
      return res.status(404).json({ message: 'Research data not found' });
    }

    // Check if user owns this data or is admin
    if (researchData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this data' });
    }

    const updatedData = await ResearchData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role');

    res.json({
      message: 'Research data updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Update research data error:', error);
    res.status(500).json({ message: 'Error updating research data', error: error.message });
  }
});

// Delete research data (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const researchData = await ResearchData.findById(req.params.id);
    
    if (!researchData) {
      return res.status(404).json({ message: 'Research data not found' });
    }

    // Check if user owns this data or is admin
    if (researchData.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this data' });
    }

    await ResearchData.findByIdAndDelete(req.params.id);

    res.json({ message: 'Research data deleted successfully' });
  } catch (error) {
    console.error('Delete research data error:', error);
    res.status(500).json({ message: 'Error deleting research data', error: error.message });
  }
});

module.exports = router;
