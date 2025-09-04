const Candidate = require('../models/Candidate');

class CandidateService {
    constructor() {
        // In-memory storage for demo purposes
        // In production, this would be replaced with a database
        this.candidates = new Map();
        this.initializeSampleData();
    }

    initializeSampleData() {
        // Add some sample candidates for demonstration
        const sampleCandidates = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                phone: '+1-555-0101',
                position: 'Software Engineer',
                experience: '3 years',
                skills: ['JavaScript', 'React', 'Node.js'],
                source: 'job_board'
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@email.com',
                phone: '+1-555-0102',
                position: 'Product Manager',
                experience: '5 years',
                skills: ['Product Management', 'Agile', 'Data Analysis'],
                source: 'referral'
            },
            {
                firstName: 'Mike',
                lastName: 'Johnson',
                email: 'mike.johnson@email.com',
                phone: '+1-555-0103',
                position: 'UX Designer',
                experience: '4 years',
                skills: ['UI/UX Design', 'Figma', 'User Research'],
                source: 'direct'
            }
        ];

        sampleCandidates.forEach(candidateData => {
            const candidate = new Candidate(candidateData);
            // Add some sample interactions
            candidate.addInteraction('email', 'Initial application received');
            candidate.addNote('Candidate looks promising based on initial review');
            this.candidates.set(candidate.id, candidate);
        });
    }

    createCandidate(candidateData) {
        const candidate = new Candidate(candidateData);
        candidate.addInteraction('application', 'Candidate application submitted');
        this.candidates.set(candidate.id, candidate);
        return candidate;
    }

    getCandidateById(id) {
        return this.candidates.get(id) || null;
    }

    getAllCandidates() {
        return Array.from(this.candidates.values());
    }

    updateCandidate(id, updates) {
        const candidate = this.candidates.get(id);
        if (!candidate) {
            return null;
        }

        // Update basic fields
        Object.keys(updates).forEach(key => {
            if (key !== 'id' && key !== 'createdAt' && candidate.hasOwnProperty(key)) {
                candidate[key] = updates[key];
            }
        });

        candidate.updatedAt = new Date();
        return candidate;
    }

    deleteCandidate(id) {
        return this.candidates.delete(id);
    }

    searchCandidates(query) {
        const candidates = this.getAllCandidates();
        if (!query) return candidates;

        const searchTerm = query.toLowerCase();
        return candidates.filter(candidate => {
            return (
                candidate.firstName.toLowerCase().includes(searchTerm) ||
                candidate.lastName.toLowerCase().includes(searchTerm) ||
                candidate.email.toLowerCase().includes(searchTerm) ||
                candidate.position.toLowerCase().includes(searchTerm) ||
                candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                candidate.status.toLowerCase().includes(searchTerm) ||
                candidate.stage.toLowerCase().includes(searchTerm)
            );
        });
    }

    getCandidatesByStage(stage) {
        return this.getAllCandidates().filter(candidate => 
            candidate.stage.toLowerCase() === stage.toLowerCase()
        );
    }

    getCandidatesByStatus(status) {
        return this.getAllCandidates().filter(candidate => 
            candidate.status.toLowerCase() === status.toLowerCase()
        );
    }

    addInteractionToCandidate(candidateId, type, description, performedBy = 'system') {
        const candidate = this.getCandidateById(candidateId);
        if (!candidate) {
            return null;
        }
        return candidate.addInteraction(type, description, performedBy);
    }

    addNoteToCandidate(candidateId, content, author = 'system') {
        const candidate = this.getCandidateById(candidateId);
        if (!candidate) {
            return null;
        }
        return candidate.addNote(content, author);
    }

    updateCandidateStage(candidateId, newStage, notes = '') {
        const candidate = this.getCandidateById(candidateId);
        if (!candidate) {
            return null;
        }
        return candidate.updateStage(newStage, notes);
    }

    updateCandidateStatus(candidateId, newStatus, notes = '') {
        const candidate = this.getCandidateById(candidateId);
        if (!candidate) {
            return null;
        }
        return candidate.updateStatus(newStatus, notes);
    }

    getStatistics() {
        const candidates = this.getAllCandidates();
        const stats = {
            total: candidates.length,
            byStage: {},
            byStatus: {},
            bySource: {}
        };

        candidates.forEach(candidate => {
            // Count by stage
            stats.byStage[candidate.stage] = (stats.byStage[candidate.stage] || 0) + 1;
            
            // Count by status
            stats.byStatus[candidate.status] = (stats.byStatus[candidate.status] || 0) + 1;
            
            // Count by source
            stats.bySource[candidate.source] = (stats.bySource[candidate.source] || 0) + 1;
        });

        return stats;
    }
}

module.exports = new CandidateService();