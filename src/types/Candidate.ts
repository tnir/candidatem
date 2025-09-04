export interface Candidate {
  id: string;
  name: string;
  firstContactDate: Date;
  closingDate?: Date;
  status: CandidateStatus;
  priority: CandidatePriority;
  isActive: boolean;
}

export enum CandidateStatus {
  INITIAL_CONTACT = "Initial Contact",
  PHONE_SCREENING = "Phone Screening",
  INTERVIEW_SCHEDULED = "Interview Scheduled",
  TECHNICAL_INTERVIEW = "Technical Interview",
  FINAL_INTERVIEW = "Final Interview",
  OFFER_MADE = "Offer Made",
  HIRED = "Hired",
  REJECTED = "Rejected",
  WITHDRAWN = "Withdrawn"
}

export enum CandidatePriority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}