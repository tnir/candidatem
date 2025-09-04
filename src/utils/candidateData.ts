import { Candidate, CandidateStatus, CandidatePriority } from '../types/Candidate';

export const generateSampleCandidates = (): Candidate[] => {
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Smith',
      firstContactDate: new Date('2024-01-15'),
      status: CandidateStatus.TECHNICAL_INTERVIEW,
      priority: CandidatePriority.HIGH,
      isActive: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      firstContactDate: new Date('2024-01-20'),
      status: CandidateStatus.PHONE_SCREENING,
      priority: CandidatePriority.MEDIUM,
      isActive: true
    },
    {
      id: '3',
      name: 'Michael Brown',
      firstContactDate: new Date('2024-01-25'),
      status: CandidateStatus.INTERVIEW_SCHEDULED,
      priority: CandidatePriority.HIGH,
      isActive: true
    },
    {
      id: '4',
      name: 'Emily Davis',
      firstContactDate: new Date('2024-02-01'),
      status: CandidateStatus.INITIAL_CONTACT,
      priority: CandidatePriority.LOW,
      isActive: true
    },
    {
      id: '5',
      name: 'David Wilson',
      firstContactDate: new Date('2024-02-05'),
      status: CandidateStatus.FINAL_INTERVIEW,
      priority: CandidatePriority.HIGH,
      isActive: true
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      firstContactDate: new Date('2024-02-10'),
      status: CandidateStatus.OFFER_MADE,
      priority: CandidatePriority.HIGH,
      isActive: true
    },
    {
      id: '7',
      name: 'James Taylor',
      firstContactDate: new Date('2024-02-12'),
      status: CandidateStatus.PHONE_SCREENING,
      priority: CandidatePriority.MEDIUM,
      isActive: true
    },
    {
      id: '8',
      name: 'Jennifer Moore',
      firstContactDate: new Date('2024-02-15'),
      status: CandidateStatus.TECHNICAL_INTERVIEW,
      priority: CandidatePriority.MEDIUM,
      isActive: true
    },
    {
      id: '9',
      name: 'Robert Clark',
      firstContactDate: new Date('2024-02-18'),
      status: CandidateStatus.INITIAL_CONTACT,
      priority: CandidatePriority.LOW,
      isActive: true
    },
    {
      id: '10',
      name: 'Amanda Lewis',
      firstContactDate: new Date('2024-02-20'),
      status: CandidateStatus.INTERVIEW_SCHEDULED,
      priority: CandidatePriority.MEDIUM,
      isActive: true
    }
  ];

  return candidates;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getPriorityColor = (priority: CandidatePriority): string => {
  switch (priority) {
    case CandidatePriority.HIGH:
      return '#ff4757';
    case CandidatePriority.MEDIUM:
      return '#ffa502';
    case CandidatePriority.LOW:
      return '#2ed573';
    default:
      return '#747d8c';
  }
};

export const getStatusColor = (status: CandidateStatus): string => {
  switch (status) {
    case CandidateStatus.INITIAL_CONTACT:
      return '#3742fa';
    case CandidateStatus.PHONE_SCREENING:
      return '#5352ed';
    case CandidateStatus.INTERVIEW_SCHEDULED:
      return '#ffa502';
    case CandidateStatus.TECHNICAL_INTERVIEW:
      return '#ff6348';
    case CandidateStatus.FINAL_INTERVIEW:
      return '#ff4757';
    case CandidateStatus.OFFER_MADE:
      return '#2ed573';
    case CandidateStatus.HIRED:
      return '#1dd1a1';
    case CandidateStatus.REJECTED:
      return '#747d8c';
    case CandidateStatus.WITHDRAWN:
      return '#a4b0be';
    default:
      return '#747d8c';
  }
};