# candidatem

Employee Candidate Nurturing Management System

## Overview

Candidatem is a comprehensive employee candidate nurturing management system designed to track and manage candidates through the hiring pipeline. It provides a complete solution for HR teams and recruiters to efficiently manage candidate relationships from initial application to final hiring decision.

![Candidate Management Interface](https://github.com/user-attachments/assets/8ad72a12-5c08-4340-b49c-c8ab0d20b5a3)

## Features

### Core Functionality
- **Candidate Profile Management** - Store comprehensive candidate information including contact details, experience, skills, and resume data
- **Pipeline Stage Tracking** - Track candidates through customizable hiring stages (Application, Screening, Interviews, Offer, etc.)
- **Communication History** - Log all interactions including emails, calls, notes, and other communications
- **Timeline View** - Chronological history of all candidate activities and stage changes
- **Status Management** - Update candidate status and track progress through the hiring process
- **Search & Filter** - Advanced search functionality to find candidates by name, position, skills, stage, or status

### Technical Features
- **REST API** - Complete RESTful API for all candidate management operations
- **Real-time Updates** - Live dashboard with candidate statistics and metrics
- **Responsive Web Interface** - Modern, mobile-friendly user interface
- **Data Validation** - Comprehensive input validation and error handling
- **Extensible Architecture** - Modular design for easy customization and extension

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tnir/candidatem.git
cd candidatem
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Development Mode

For development with hot reload:
```bash
npm run dev
```

## API Documentation

### Candidates Endpoints

#### Get All Candidates
```
GET /api/candidates
Query Parameters:
- search: Search term for filtering candidates
- stage: Filter by pipeline stage
- status: Filter by candidate status
```

#### Get Candidate by ID
```
GET /api/candidates/:id
```

#### Create New Candidate
```
POST /api/candidates
Body: {
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phone": "string",
  "position": "string",
  "experience": "string",
  "skills": ["string"],
  "source": "string"
}
```

#### Update Candidate
```
PUT /api/candidates/:id
Body: Candidate fields to update
```

#### Update Candidate Stage
```
PATCH /api/candidates/:id/stage
Body: {
  "stage": "string",
  "notes": "string"
}
```

#### Add Interaction
```
POST /api/candidates/:id/interactions
Body: {
  "type": "string",
  "description": "string",
  "performedBy": "string"
}
```

#### Add Note
```
POST /api/candidates/:id/notes
Body: {
  "content": "string",
  "author": "string"
}
```

### Pipeline Endpoints

#### Get Pipeline Stages
```
GET /api/pipeline/stages
```

#### Get Pipeline Overview
```
GET /api/pipeline/overview
```

#### Move Candidate Through Pipeline
```
POST /api/pipeline/move/:candidateId
Body: {
  "toStage": "string",
  "notes": "string"
}
```

## Pipeline Stages

The system includes the following default pipeline stages:

1. **Application** - Candidate has submitted their application
2. **Initial Screening** - Resume and initial qualification review
3. **Phone Interview** - Initial phone or video screening call
4. **Technical Interview** - Technical assessment and coding interview
5. **Onsite Interview** - In-person or comprehensive virtual interview
6. **Final Interview** - Final round with leadership or stakeholders
7. **Offer Extended** - Job offer has been extended to candidate
8. **Hired** - Candidate has accepted offer and been hired
9. **Rejected** - Candidate has been rejected
10. **Withdrawn** - Candidate has withdrawn from process

## Candidate Statuses

- **active** - Candidate is actively being considered
- **on_hold** - Candidate process is temporarily paused
- **rejected** - Candidate has been rejected
- **withdrawn** - Candidate has withdrawn from the process
- **hired** - Candidate has been successfully hired

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Architecture

### Backend Structure
- **Models** - Data models for candidates and interactions
- **Services** - Business logic and data management
- **Routes** - API endpoint definitions
- **Middleware** - Request processing and validation

### Frontend Structure
- **Single Page Application** - Modern JavaScript interface
- **Responsive Design** - Works on desktop and mobile devices
- **Modal Forms** - Intuitive candidate creation and editing
- **Real-time Search** - Instant candidate filtering and search

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions, please open an issue in the GitHub repository.
