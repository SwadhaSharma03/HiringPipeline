
import { Candidate, JobOverview } from "./types";

export const jobOverview: JobOverview = {
  title: "Senior Full Stack Engineer",
  department: "Engineering",
  location: "San Francisco, CA (Hybrid)",
  openPositions: 2,
  hiringManager: "Sarah Jenkins",
  totalApplicants: 124,
};

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Dipesh",
    avatar: "https://i.pravatar.cc/150?u=alex",
    currentRole: "Senior Software Engineer",
    currentCompany: "TechFlow Solutions",
    experience: 8,
    matchScore: 94,
    status: "Interview",
    lastActivity: "2024-03-20T10:00:00Z",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    email: "alex.rivera@example.com",
    phone: "+1 (555) 123-4567",
    notes: [
      { id: "n1", text: "Strong architectural thinking on the system design round.", author: "Sarah Jenkins", date: "2024-03-18" },
      { id: "n2", text: "Culture fit seems excellent.", author: "Mike Ross", date: "2024-03-19" },
    ]
  },
  {
    id: "2",
    name: "Abhishek",
    avatar: "https://i.pravatar.cc/150?u=elena",
    currentRole: "Backend Lead",
    currentCompany: "CloudScale Systems",
    experience: 12,
    matchScore: 89,
    status: "Shortlisted",
    lastActivity: "2024-03-21T14:30:00Z",
    skills: ["Go", "Kubernetes", "AWS", "Python"],
    email: "elena.chen@example.com",
    phone: "+1 (555) 987-6543",
    notes: []
  },
  {
    id: "3",
    name: "Shreya",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    currentRole: "Full Stack Developer",
    currentCompany: "VentureBits Inc.",
    experience: 5,
    matchScore: 82,
    status: "Applied",
    lastActivity: "2024-03-22T09:15:00Z",
    skills: ["React", "Next.js", "Tailwind", "Supabase"],
    email: "marcus.t@example.com",
    phone: "+1 (555) 456-7890",
    notes: []
  },
  {
    id: "4",
    name: "Aashtha",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    currentRole: "Frontend Engineer",
    currentCompany: "DesignFlow",
    experience: 6,
    matchScore: 91,
    status: "Offered",
    lastActivity: "2024-03-19T11:45:00Z",
    skills: ["React", "Framer Motion", "Design Systems", "A/B Testing"],
    email: "s.martinez@example.com",
    phone: "+1 (555) 234-5678",
    notes: [
      { id: "n3", text: "Offer sent with base 160k + equity.", author: "Recruitment Team", date: "2024-03-19" }
    ]
  },
  {
    id: "5",
    name: "Nilesh",
    avatar: "https://i.pravatar.cc/150?u=james",
    currentRole: "Lead Engineer",
    currentCompany: "GlobalBank IT",
    experience: 15,
    matchScore: 78,
    status: "Interview",
    lastActivity: "2024-03-22T16:20:00Z",
    skills: ["Java", "Spring Boot", "Microservices", "React"],
    email: "j.wilson@example.com",
    phone: "+1 (555) 321-0987",
    notes: []
  },
  {
    id: "6",
    name: "Divita",
    avatar: "https://i.pravatar.cc/150?u=zara",
    currentRole: "Software Developer",
    currentCompany: "StartupLab",
    experience: 3,
    matchScore: 85,
    status: "Shortlisted",
    lastActivity: "2024-03-21T08:00:00Z",
    skills: ["React", "Node", "GraphQL"],
    email: "zara.a@example.com",
    phone: "+1 (555) 000-1111",
    notes: []
  }
];

export const stages = ["Applied", "Shortlisted", "Interview", "Offered", "Hired"] as const;
