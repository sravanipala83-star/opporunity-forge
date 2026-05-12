export type ProjectType = "Practice" | "Portfolio" | "Startup-ready";
export type ProjectStatus = "Open" | "Full" | "Draft";
export type TaskStatus = "Todo" | "In Progress" | "Done" | "Blocked";

export interface Role {
  title: string;
  skills: string[];
  count: number;
}

export interface Project {
  id: string;
  title: string;
  creator: string;
  type: ProjectType;
  status: ProjectStatus;
  applications: number;
  filled: number;
  totalSlots: number;
  description: string;
  roles: Role[];
}

export interface Seeker {
  id: string;
  name: string;
  role: string;
  skills: string[];
  level: "Junior" | "Mid" | "Senior";
  city: string;
}

export interface Creator {
  id: string;
  name: string;
  role: string;
  level: "Junior" | "Mid" | "Senior";
  building: string;
}

export interface Application {
  id: string;
  projectId: string;
  seekerId: string;
  appliedRole: string;
  pitch: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  due: string;
}

export const seekers: Seeker[] = [
  { id: "s1", name: "Arjun Mehta", role: "Backend Dev", skills: ["Python", "FastAPI", "PostgreSQL"], level: "Junior", city: "Hyderabad" },
  { id: "s2", name: "Priya Sharma", role: "Frontend Dev", skills: ["React", "Tailwind", "TypeScript"], level: "Mid", city: "Bangalore" },
  { id: "s3", name: "Ravi Kumar", role: "Designer", skills: ["Figma", "UI/UX", "Prototyping"], level: "Junior", city: "Chennai" },
];

export const creators: Creator[] = [
  { id: "c1", name: "Neha Reddy", role: "Full Stack Dev", level: "Senior", building: "AI Resume Screener" },
  { id: "c2", name: "Karan Singh", role: "Product Manager", level: "Mid", building: "Remote Team Dashboard" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "AI Resume Screener",
    creator: "Neha Reddy",
    type: "Startup-ready",
    status: "Open",
    applications: 3,
    filled: 1,
    totalSlots: 3,
    description: "An AI-powered tool that parses and scores resumes against job descriptions.",
    roles: [
      { title: "Backend Dev", skills: ["Python", "FastAPI"], count: 1 },
      { title: "Frontend Dev", skills: ["React"], count: 1 },
    ],
  },
  {
    id: "2",
    title: "Remote Team Dashboard",
    creator: "Karan Singh",
    type: "Portfolio",
    status: "Open",
    applications: 5,
    filled: 2,
    totalSlots: 5,
    description: "A real-time dashboard for remote teams to track availability, tasks, and standups.",
    roles: [
      { title: "Frontend Dev", skills: ["React", "TypeScript"], count: 2 },
      { title: "Designer", skills: ["Figma"], count: 1 },
    ],
  },
  {
    id: "3",
    title: "Open Source API Gateway",
    creator: "Neha Reddy",
    type: "Practice",
    status: "Full",
    applications: 8,
    filled: 2,
    totalSlots: 2,
    description: "Build a lightweight API gateway with rate limiting and auth middleware.",
    roles: [{ title: "Backend Dev", skills: ["Node.js", "Docker"], count: 2 }],
  },
];

export const applications: Application[] = [
  { id: "a1", projectId: "1", seekerId: "s1", appliedRole: "Backend Dev", pitch: "I've built 3 REST APIs using FastAPI. Excited to contribute.", status: "Pending" },
  { id: "a2", projectId: "1", seekerId: "s2", appliedRole: "Frontend Dev", pitch: "Strong in React. Would love to build the dashboard UI.", status: "Pending" },
  { id: "a3", projectId: "1", seekerId: "s3", appliedRole: "Frontend Dev", pitch: "I can handle both design and frontend for this project.", status: "Pending" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Set up FastAPI project structure", assignee: "Arjun Mehta", status: "Done", due: "May 6" },
  { id: "t2", title: "Design login screen in Figma", assignee: "Priya Sharma", status: "In Progress", due: "May 14" },
  { id: "t3", title: "Write API endpoint for resume parsing", assignee: "Arjun Mehta", status: "Todo", due: "May 18" },
  { id: "t4", title: "Build project card component", assignee: "Priya Sharma", status: "In Progress", due: "May 15" },
  { id: "t5", title: "Set up PostgreSQL schema", assignee: "Arjun Mehta", status: "Blocked", due: "May 12" },
];

export const typeBadge = (type: ProjectType) => {
  if (type === "Practice") return "bg-blue-100 text-blue-700 border-blue-200";
  if (type === "Portfolio") return "bg-purple-100 text-purple-700 border-purple-200";
  return "bg-orange-100 text-orange-700 border-orange-200";
};

export const statusBadge = (status: string) => {
  switch (status) {
    case "Open":
    case "Approved":
    case "Done":
      return "bg-green-100 text-green-700 border-green-200";
    case "Full":
      return "bg-muted text-muted-foreground border-border";
    case "Draft":
    case "Pending":
    case "In Progress":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Rejected":
    case "Blocked":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};