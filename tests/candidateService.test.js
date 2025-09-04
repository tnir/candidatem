const candidateService = require('../src/services/candidateService');

describe('Candidate Service', () => {
    let candidateId;

    beforeEach(() => {
        // Clear the service and reinitialize with sample data
        candidateService.candidates.clear();
        candidateService.initializeSampleData();
    });

    test('should have sample candidates initialized', () => {
        const candidates = candidateService.getAllCandidates();
        expect(candidates.length).toBeGreaterThan(0);
    });

    test('should create a new candidate', () => {
        const candidateData = {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            phone: '+1-555-0104',
            position: 'Data Scientist',
            experience: '2 years',
            skills: ['Python', 'Machine Learning', 'SQL'],
            source: 'referral'
        };

        const candidate = candidateService.createCandidate(candidateData);
        candidateId = candidate.id;

        expect(candidate).toBeDefined();
        expect(candidate.firstName).toBe('Alice');
        expect(candidate.lastName).toBe('Johnson');
        expect(candidate.email).toBe('alice.johnson@example.com');
        expect(candidate.interactions).toHaveLength(1);
        expect(candidate.interactions[0].type).toBe('application');
    });

    test('should get candidate by ID', () => {
        const candidates = candidateService.getAllCandidates();
        const firstCandidate = candidates[0];
        
        const retrieved = candidateService.getCandidateById(firstCandidate.id);
        expect(retrieved).toBeDefined();
        expect(retrieved.id).toBe(firstCandidate.id);
    });

    test('should return null for non-existent candidate', () => {
        const retrieved = candidateService.getCandidateById('non-existent-id');
        expect(retrieved).toBeNull();
    });

    test('should search candidates by name', () => {
        const results = candidateService.searchCandidates('john');
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].firstName.toLowerCase()).toContain('john');
    });

    test('should search candidates by skills', () => {
        const results = candidateService.searchCandidates('javascript');
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].skills.some(skill => 
            skill.toLowerCase().includes('javascript')
        )).toBe(true);
    });

    test('should filter candidates by stage', () => {
        const results = candidateService.getCandidatesByStage('application');
        expect(results.length).toBeGreaterThan(0);
        results.forEach(candidate => {
            expect(candidate.stage).toBe('application');
        });
    });

    test('should filter candidates by status', () => {
        const results = candidateService.getCandidatesByStatus('applied');
        expect(results.length).toBeGreaterThan(0);
        results.forEach(candidate => {
            expect(candidate.status).toBe('applied');
        });
    });

    test('should update candidate', () => {
        const candidates = candidateService.getAllCandidates();
        const candidate = candidates[0];
        
        const updated = candidateService.updateCandidate(candidate.id, {
            experience: '5 years',
            skills: ['JavaScript', 'TypeScript', 'React', 'Node.js']
        });

        expect(updated).toBeDefined();
        expect(updated.experience).toBe('5 years');
        expect(updated.skills).toContain('TypeScript');
    });

    test('should delete candidate', () => {
        const candidates = candidateService.getAllCandidates();
        const candidate = candidates[0];
        const initialCount = candidates.length;
        
        const deleted = candidateService.deleteCandidate(candidate.id);
        expect(deleted).toBe(true);
        
        const remainingCandidates = candidateService.getAllCandidates();
        expect(remainingCandidates.length).toBe(initialCount - 1);
        
        const retrieved = candidateService.getCandidateById(candidate.id);
        expect(retrieved).toBeNull();
    });

    test('should add interaction to candidate', () => {
        const candidates = candidateService.getAllCandidates();
        const candidate = candidates[0];
        
        const interaction = candidateService.addInteractionToCandidate(
            candidate.id,
            'interview',
            'Technical interview completed',
            'interviewer'
        );

        expect(interaction).toBeDefined();
        expect(interaction.type).toBe('interview');
        expect(interaction.description).toBe('Technical interview completed');
        
        const updated = candidateService.getCandidateById(candidate.id);
        expect(updated.interactions.length).toBeGreaterThan(1);
    });

    test('should add note to candidate', () => {
        const candidates = candidateService.getAllCandidates();
        const candidate = candidates[0];
        
        const note = candidateService.addNoteToCandidate(
            candidate.id,
            'Strong technical skills',
            'tech_lead'
        );

        expect(note).toBeDefined();
        expect(note.content).toBe('Strong technical skills');
        expect(note.author).toBe('tech_lead');
        
        const updated = candidateService.getCandidateById(candidate.id);
        expect(updated.notes.length).toBeGreaterThan(0);
    });

    test('should update candidate stage', () => {
        const candidates = candidateService.getAllCandidates();
        const candidate = candidates[0];
        
        const updated = candidateService.updateCandidateStage(
            candidate.id,
            'screening',
            'Moved to screening stage'
        );

        expect(updated).toBeDefined();
        expect(updated.stage).toBe('screening');
    });

    test('should get statistics', () => {
        const stats = candidateService.getStatistics();
        
        expect(stats).toBeDefined();
        expect(stats.total).toBeGreaterThan(0);
        expect(stats.byStage).toBeDefined();
        expect(stats.byStatus).toBeDefined();
        expect(stats.bySource).toBeDefined();
    });
});