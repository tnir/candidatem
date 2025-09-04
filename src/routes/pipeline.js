const express = require('express');
const router = express.Router();
const candidateService = require('../services/candidateService');

// Define the standard hiring pipeline stages
const PIPELINE_STAGES = [
    {
        id: 'application',
        name: 'Application',
        description: 'Candidate has submitted their application',
        order: 1
    },
    {
        id: 'screening',
        name: 'Initial Screening',
        description: 'Resume and initial qualification review',
        order: 2
    },
    {
        id: 'phone_interview',
        name: 'Phone Interview',
        description: 'Initial phone or video screening call',
        order: 3
    },
    {
        id: 'technical_interview',
        name: 'Technical Interview',
        description: 'Technical assessment and coding interview',
        order: 4
    },
    {
        id: 'onsite_interview',
        name: 'Onsite Interview',
        description: 'In-person or comprehensive virtual interview',
        order: 5
    },
    {
        id: 'final_interview',
        name: 'Final Interview',
        description: 'Final round with leadership or stakeholders',
        order: 6
    },
    {
        id: 'offer',
        name: 'Offer Extended',
        description: 'Job offer has been extended to candidate',
        order: 7
    },
    {
        id: 'hired',
        name: 'Hired',
        description: 'Candidate has accepted offer and been hired',
        order: 8
    },
    {
        id: 'rejected',
        name: 'Rejected',
        description: 'Candidate has been rejected',
        order: 99
    },
    {
        id: 'withdrawn',
        name: 'Withdrawn',
        description: 'Candidate has withdrawn from process',
        order: 99
    }
];

const CANDIDATE_STATUSES = [
    'active',
    'on_hold',
    'rejected',
    'withdrawn',
    'hired'
];

// Get pipeline stages
router.get('/stages', (req, res) => {
    try {
        res.json({
            success: true,
            data: PIPELINE_STAGES
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get available statuses
router.get('/statuses', (req, res) => {
    try {
        res.json({
            success: true,
            data: CANDIDATE_STATUSES
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get pipeline overview (candidates grouped by stage)
router.get('/overview', (req, res) => {
    try {
        const candidates = candidateService.getAllCandidates();
        const pipeline = {};
        
        // Initialize pipeline with all stages
        PIPELINE_STAGES.forEach(stage => {
            pipeline[stage.id] = {
                ...stage,
                candidates: []
            };
        });
        
        // Group candidates by stage
        candidates.forEach(candidate => {
            if (pipeline[candidate.stage]) {
                pipeline[candidate.stage].candidates.push(candidate);
            } else {
                // Handle candidates with unknown stages
                if (!pipeline.unknown) {
                    pipeline.unknown = {
                        id: 'unknown',
                        name: 'Unknown Stage',
                        description: 'Candidates with unrecognized stages',
                        order: 999,
                        candidates: []
                    };
                }
                pipeline.unknown.candidates.push(candidate);
            }
        });
        
        // Sort stages by order and convert to array
        const sortedPipeline = Object.values(pipeline)
            .sort((a, b) => a.order - b.order)
            .map(stage => ({
                ...stage,
                count: stage.candidates.length
            }));
        
        res.json({
            success: true,
            data: sortedPipeline
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Move candidate through pipeline
router.post('/move/:candidateId', (req, res) => {
    try {
        const { candidateId } = req.params;
        const { fromStage, toStage, notes } = req.body;
        
        if (!toStage) {
            return res.status(400).json({
                success: false,
                error: 'Target stage (toStage) is required'
            });
        }
        
        // Validate that the target stage exists
        const validStage = PIPELINE_STAGES.find(stage => stage.id === toStage);
        if (!validStage) {
            return res.status(400).json({
                success: false,
                error: 'Invalid target stage'
            });
        }
        
        const candidate = candidateService.updateCandidateStage(candidateId, toStage, notes);
        
        if (!candidate) {
            return res.status(404).json({
                success: false,
                error: 'Candidate not found'
            });
        }
        
        res.json({
            success: true,
            data: candidate,
            message: `Candidate moved to ${validStage.name} stage`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get pipeline metrics
router.get('/metrics', (req, res) => {
    try {
        const candidates = candidateService.getAllCandidates();
        const stats = candidateService.getStatistics();
        
        // Calculate conversion rates between stages
        const conversions = {};
        const stageOrder = PIPELINE_STAGES.sort((a, b) => a.order - b.order);
        
        for (let i = 0; i < stageOrder.length - 1; i++) {
            const currentStage = stageOrder[i];
            const nextStage = stageOrder[i + 1];
            
            const currentCount = stats.byStage[currentStage.id] || 0;
            const nextCount = stats.byStage[nextStage.id] || 0;
            
            conversions[`${currentStage.id}_to_${nextStage.id}`] = {
                from: currentStage.name,
                to: nextStage.name,
                currentCount,
                nextCount,
                conversionRate: currentCount > 0 ? Math.round((nextCount / currentCount) * 100) : 0
            };
        }
        
        // Calculate average time in each stage (simplified for demo)
        const averageTimeInStage = {};
        PIPELINE_STAGES.forEach(stage => {
            averageTimeInStage[stage.id] = {
                stageName: stage.name,
                averageDays: Math.floor(Math.random() * 7) + 1 // Mock data for demo
            };
        });
        
        res.json({
            success: true,
            data: {
                totalCandidates: candidates.length,
                stageDistribution: stats.byStage,
                statusDistribution: stats.byStatus,
                sourceDistribution: stats.bySource,
                conversions,
                averageTimeInStage
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;