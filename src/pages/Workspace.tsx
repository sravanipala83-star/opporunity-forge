import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  Video,
  MessageCircle,
  CheckCircle2,
  Circle,
  Clock,
  Users,
  ExternalLink,
  GitBranch,
  Star,
  Award,
  Inbox,
  FileText,
  Link2,
  X,
} from "lucide-react";

const team = [
  { name: "Aisha P.", role: "Frontend", initial: "A" },
  { name: "Ravi K.", role: "Backend", initial: "R" },
  { name: "Maya S.", role: "Design", initial: "M" },
  { name: "Dev T.", role: "Full-Stack", initial: "D" },
];

const tasks = [
  { title: "Set up auth flow", who: "Ravi K.", status: "done" },
  { title: "Design onboarding screens", who: "Maya S.", status: "done" },
  { title: "Build dashboard layout", who: "Aisha P.", status: "in_progress" },
  { title: "API: project endpoints", who: "Ravi K.", status: "in_progress" },
  { title: "Write README + setup docs", who: "Dev T.", status: "todo" },
];

const messages = [
  { who: "Ravi K.", text: "Pushed the auth branch — please review when free.", time: "2m" },
  { who: "Maya S.", text: "Updated the Figma. Onboarding flows are ready.", time: "10m" },
  { who: "Aisha P.", text: "Stuck on the dashboard grid responsiveness — anyone free for a quick call?", time: "1h" },
];

const requests = [
  {
    name: "Karan V.",
    role: "Backend",
    pitch: "3 yrs Node/Postgres. Can own the API + auth this sprint. ~10 hrs/week.",
    skills: ["Node.js", "PostgreSQL", "DevOps"],
    resume: "karan-v-resume.pdf",
    portfolio: "github.com/karanv",
  },
  {
    name: "Priya N.",
    role: "Design",
    pitch: "Product designer transitioning from agency work. Strong on Figma, design systems.",
    skills: ["Design", "Product"],
    resume: "priya-n-portfolio.pdf",
    portfolio: "priyan.design",
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "done") return <CheckCircle2 size={16} className="text-secondary" />;
  if (status === "in_progress") return <Clock size={16} className="text-primary" />;
  return <Circle size={16} className="text-muted-foreground" />;
};

const Workspace = () => (
  <div className="min-h-screen bg-section-gradient">
    <div className="container max-w-6xl pt-24 pb-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to home
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-3">
          <Star size={12} /> Workspace Preview
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">AI-powered Study Planner</h1>
        <p className="text-muted-foreground mb-2">A peek at how a real Opportiq project workspace looks once your team is formed.</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-8">
          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">Portfolio</span>
          <span className="flex items-center gap-1"><Users size={12} /> 4 members</span>
          <span className="flex items-center gap-1"><GitBranch size={12} /> main</span>
        </div>
      </motion.div>

      {/* Top action bar — calls + repo */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="bg-card rounded-2xl p-5 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition group">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"><Video size={18} className="text-secondary" /></div>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
          </div>
          <div className="font-bold text-sm">Start a call</div>
          <p className="text-xs text-muted-foreground mt-0.5">Jump on Zoom or Google Meet with your team.</p>
        </a>
        <a href="https://discord.com" target="_blank" rel="noreferrer" className="bg-card rounded-2xl p-5 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition group">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"><MessageCircle size={18} className="text-secondary" /></div>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
          </div>
          <div className="font-bold text-sm">Team Discord</div>
          <p className="text-xs text-muted-foreground mt-0.5">Async chat, doubts and channels per role.</p>
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-card rounded-2xl p-5 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition group">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"><Github size={18} className="text-secondary" /></div>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground" />
          </div>
          <div className="font-bold text-sm">GitHub repo</div>
          <p className="text-xs text-muted-foreground mt-0.5">Codebase lives on GitHub — linked to this project.</p>
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Tasks</h2>
            <span className="text-xs text-muted-foreground">2 done · 2 in progress · 1 todo</span>
          </div>
          <ul className="divide-y divide-border">
            {tasks.map((t) => (
              <li key={t.title} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <StatusIcon status={t.status} />
                  <span className={`text-sm ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}>{t.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.who}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Team + activity score */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
            <h2 className="font-bold mb-4">Team</h2>
            <ul className="space-y-3">
              {team.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">{m.initial}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
            <div className="flex items-center gap-2 mb-2"><Award size={16} className="text-secondary" /><h2 className="font-bold">Your contribution</h2></div>
            <div className="text-3xl font-extrabold">82<span className="text-sm text-muted-foreground font-medium">/100</span></div>
            <p className="text-xs text-muted-foreground mt-1">Based on tasks shipped, peer feedback and participation.</p>
          </div>
        </div>
      </div>

      {/* Doubts / chat preview */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Recent activity</h2>
          <span className="text-xs text-muted-foreground">Full chat happens on Discord</span>
        </div>
        <ul className="space-y-4">
          {messages.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs shrink-0">{m.who[0]}</div>
              <div className="flex-1">
                <div className="text-sm"><span className="font-semibold">{m.who}</span> <span className="text-muted-foreground text-xs">· {m.time} ago</span></div>
                <p className="text-sm text-muted-foreground mt-0.5">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Owner: Join requests */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Inbox size={16} className="text-secondary" />
            <h2 className="font-bold">Join requests</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">Owner view</span>
          </div>
          <span className="text-xs text-muted-foreground">{requests.length} pending</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Review applicants — accept to add them to the team, or decline.</p>
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r.name} className="border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{r.name}</span>
                    <span className="text-xs text-muted-foreground">applying as {r.role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{r.pitch}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><FileText size={12} /> {r.resume}</span>
                    <span className="inline-flex items-center gap-1"><Link2 size={12} /> {r.portfolio}</span>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 md:w-32">
                <Button variant="hero" size="sm" className="flex-1"><CheckCircle2 size={14} /> Accept</Button>
                <Button variant="outline" size="sm" className="flex-1"><X size={14} /> Decline</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground mb-4">Ready to get into a real workspace like this?</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button variant="hero" asChild><Link to="/join">Join a Project</Link></Button>
          <Button variant="hero-outline" asChild><Link to="/start">Start Your Own</Link></Button>
        </div>
      </div>
    </div>
  </div>
);

export default Workspace;