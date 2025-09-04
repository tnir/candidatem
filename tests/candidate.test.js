const Candidate = require('../src/models/Candidate');

describe('Candidate Model', () => {
    let candidate;

    beforeEach(() => {
        candidate = new Candidate({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-0101',
            position: 'Software Engineer',
            experience: '3 years',
            skills: ['JavaScript', 'React', 'Node.js'],
            source: 'job_board'
        });
    });

    test('should create a candidate with required fields', () => {
        expect(candidate.firstName).toBe('John');
        expect(candidate.lastName).toBe('Doe');
        expect(candidate.email).toBe('john.doe@example.com');
        expect(candidate.position).toBe('Software Engineer');
        expect(candidate.id).toBeDefined();
        expect(candidate.createdAt).toBeInstanceOf(Date);
        expect(candidate.status).toBe('applied');
        expect(candidate.stage).toBe('application');
    });

    test('should get full name correctly', () => {
        expect(candidate.getFullName()).toBe('John Doe');
    });

    test('should add interaction', () => {
        const interaction = candidate.addInteraction('email', 'Sent welcome email', 'recruiter');
        
        expect(interaction).toBeDefined();
        expect(interaction.type).toBe('email');
        expect(interaction.description).toBe('Sent welcome email');
        expect(interaction.performedBy).toBe('recruiter');
        expect(candidate.interactions).toHaveLength(1);
    });

    test('should add note', () => {
        const note = candidate.addNote('Great candidate', 'hiring_manager');
        
        expect(note).toBeDefined();
        expect(note.content).toBe('Great candidate');
        expect(note.author).toBe('hiring_manager');
        expect(candidate.notes).toHaveLength(1);
    });

    test('should update stage', () => {
        const result = candidate.updateStage('screening', 'Passed initial review');
        
        expect(result).toBe(candidate);
        expect(candidate.stage).toBe('screening');
        expect(candidate.interactions).toHaveLength(1);
        expect(candidate.interactions[0].type).toBe('stage_change');
        expect(candidate.interactions[0].description).toContain('application to screening');
    });

    test('should update status', () => {
        const result = candidate.updateStatus('on_hold', 'Waiting for position to open');
        
        expect(result).toBe(candidate);
        expect(candidate.status).toBe('on_hold');
        expect(candidate.interactions).toHaveLength(1);
        expect(candidate.interactions[0].type).toBe('status_change');
        expect(candidate.interactions[0].description).toContain('applied to on_hold');
    });

    test('should serialize to JSON correctly', () => {
        const json = candidate.toJSON();
        
        expect(json.id).toBe(candidate.id);
        expect(json.fullName).toBe('John Doe');
        expect(json.firstName).toBe('John');
        expect(json.lastName).toBe('Doe');
        expect(json.email).toBe('john.doe@example.com');
        expect(json.skills).toEqual(['JavaScript', 'React', 'Node.js']);
    });
});