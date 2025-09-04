const express = require('express');
const router = express.Router();
const candidateService = require('../services/candidateService');

// Get all candidates or search candidates
router.get('/', (req, res) => {
    try {
        const { search, stage, status } = req.query;
        
        let candidates;
        if (search) {
            candidates = candidateService.searchCandidates(search);
        } else if (stage) {
            candidates = candidateService.getCandidatesByStage(stage);
        } else if (status) {
            candidates = candidateService.getCandidatesByStatus(status);
        } else {
            candidates = candidateService.getAllCandidates();
        }
        
        res.json({
            success: true,
            data: candidates,
            count: candidates.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get candidate by ID
router.get('/:id', (req, res) => {
    try {
        const candidate = candidateService.getCandidateById(req.params.id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            data: candidate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Create new candidate
router.post('/', (req, res) => {
    try {
        const requiredFields = ['firstName', 'lastName', 'email', 'position'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }
        
        const candidate = candidateService.createCandidate(req.body);
        res.status(201).json({
            success: true,
            data: candidate,
            message: 'Candidate created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update candidate
router.put('/:id', (req, res) => {
    try {
        const candidate = candidateService.updateCandidate(req.params.id, req.body);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            data: candidate,
            message: 'Candidate updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete candidate
router.delete('/:id', (req, res) => {
    try {
        const deleted = candidateService.deleteCandidate(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Candidate deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Add interaction to candidate
router.post('/:id/interactions', (req, res) => {
    try {
        const { type, description, performedBy } = req.body;
        
        if (!type || !description) {
            return res.status(400).json({
                success: false,
                error: 'Type and description are required'
            });
        }
        
        const interaction = candidateService.addInteractionToCandidate(
            req.params.id,
            type,
            description,
            performedBy
        );
        
        if (!interaction) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.status(201).json({
            success: true,
            data: interaction,
            message: 'Interaction added successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Add note to candidate
router.post('/:id/notes', (req, res) => {
    try {
        const { content, author } = req.body;
        
        if (!content) {
            return res.status(400).json({
                success: false,
                error: 'Content is required'
            });
        }
        
        const note = candidateService.addNoteToCandidate(
            req.params.id,
            content,
            author
        );
        
        if (!note) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.status(201).json({
            success: true,
            data: note,
            message: 'Note added successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update candidate stage
router.patch('/:id/stage', (req, res) => {
    try {
        const { stage, notes } = req.body;
        
        if (!stage) {
            return res.status(400).json({
                success: false,
                error: 'Stage is required'
            });
        }
        
        const candidate = candidateService.updateCandidateStage(
            req.params.id,
            stage,
            notes
        );
        
        if (!candidate) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            data: candidate,
            message: 'Candidate stage updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update candidate status
router.patch('/:id/status', (req, res) => {
    try {
        const { status, notes } = req.body;
        
        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'Status is required'
            });
        }
        
        const candidate = candidateService.updateCandidateStatus(
            req.params.id,
            status,
            notes
        );
        
        if (!candidate) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            data: candidate,
            message: 'Candidate status updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get statistics
router.get('/stats/overview', (req, res) => {
    try {
        const stats = candidateService.getStatistics();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;