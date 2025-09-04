const { v4: uuidv4 } = require('uuid');

class Candidate {
    constructor({
        firstName,
        lastName,
        email,
        phone,
        position,
        experience,
        skills = [],
        resumeUrl = null,
        linkedinUrl = null,
        source = 'direct'
    }) {
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.experience = experience;
        this.skills = skills;
        this.resumeUrl = resumeUrl;
        this.linkedinUrl = linkedinUrl;
        this.source = source;
        this.status = 'applied';
        this.stage = 'application';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.interactions = [];
        this.notes = [];
    }

    addInteraction(type, description, performedBy = 'system') {
        const interaction = {
            id: uuidv4(),
            type, // 'email', 'call', 'interview', 'note', 'status_change'
            description,
            performedBy,
            timestamp: new Date()
        };
        this.interactions.push(interaction);
        this.updatedAt = new Date();
        return interaction;
    }

    addNote(content, author = 'system') {
        const note = {
            id: uuidv4(),
            content,
            author,
            timestamp: new Date()
        };
        this.notes.push(note);
        this.updatedAt = new Date();
        return note;
    }

    updateStage(newStage, notes = '') {
        const oldStage = this.stage;
        this.stage = newStage;
        this.updatedAt = new Date();
        
        this.addInteraction(
            'stage_change',
            `Stage changed from ${oldStage} to ${newStage}${notes ? ': ' + notes : ''}`,
            'system'
        );
        
        return this;
    }

    updateStatus(newStatus, notes = '') {
        const oldStatus = this.status;
        this.status = newStatus;
        this.updatedAt = new Date();
        
        this.addInteraction(
            'status_change',
            `Status changed from ${oldStatus} to ${newStatus}${notes ? ': ' + notes : ''}`,
            'system'
        );
        
        return this;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.getFullName(),
            email: this.email,
            phone: this.phone,
            position: this.position,
            experience: this.experience,
            skills: this.skills,
            resumeUrl: this.resumeUrl,
            linkedinUrl: this.linkedinUrl,
            source: this.source,
            status: this.status,
            stage: this.stage,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            interactions: this.interactions,
            notes: this.notes
        };
    }
}

module.exports = Candidate;