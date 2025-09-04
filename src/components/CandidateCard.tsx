import React from 'react';
import { Candidate } from '../types/Candidate';
import { formatDate, getPriorityColor, getStatusColor } from '../utils/candidateData';
import './CandidateCard.css';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const daysSinceContact = Math.floor(
    (new Date().getTime() - candidate.firstContactDate.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div className="candidate-card">
      <div className="candidate-header">
        <h3 className="candidate-name">{candidate.name}</h3>
        <span 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(candidate.priority) }}
        >
          {candidate.priority}
        </span>
      </div>
      
      <div className="candidate-details">
        <div className="detail-row">
          <span className="detail-label">First Contact:</span>
          <span className="detail-value">
            {formatDate(candidate.firstContactDate)} ({daysSinceContact} days ago)
          </span>
        </div>
        
        {candidate.closingDate && (
          <div className="detail-row">
            <span className="detail-label">Closing Date:</span>
            <span className="detail-value">{formatDate(candidate.closingDate)}</span>
          </div>
        )}
        
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span 
            className="status-badge"
            style={{ 
              backgroundColor: getStatusColor(candidate.status),
              color: 'white'
            }}
          >
            {candidate.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;