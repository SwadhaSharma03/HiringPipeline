
export type Stage = 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired';

export interface Note {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  currentRole: string;
  currentCompany: string;
  experience: number;
  matchScore: number;
  status: Stage;
  lastActivity: string;
  skills: string[];
  notes: Note[];
  email: string;
  phone: string;
}

export interface JobOverview {
  title: string;
  department: string;
  location: string;
  openPositions: number;
  hiringManager: string;
  totalApplicants: number;
}
