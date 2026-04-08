import { motion } from "framer-motion";
import { User, FolderOpen, UsersRound, LayoutDashboard, BarChart3, FileText, Award } from "lucide-react";
import { ReactNode } from "react";

interface Feature {
  icon: typeof User;
  badge: string;
  title: string;
  desc: string;
  highlights: string[];
  visual: ReactNode;
}

const ProfileCard = () => (
  <div className="bg-card rounded-2xl border border-border p-6 shadow-[var(--card-shadow)]">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-hero-gradient" />
      <div>
        <div className="font-bold text-sm">Alex Rivera</div>
        <div className="text-xs text-muted-foreground">Full-Stack Developer</div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {["React", "Node.js", "Python", "TypeScript"].map((s) => (
        <span key={s} className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">{s}</span>
      ))}
    </div>
    <div className="flex gap-6 text-xs text-muted-foreground">
      <span><strong className="text-foreground">12</strong> Projects</span>
      <span><strong className="text-foreground">87</strong> Tasks</span>
      <span><strong className="text-foreground">4.8</strong> Rating</span>
    </div>
  </div>
);

const ProjectCards = () => (
  <div className="space-y-3">
    {[
      { name: "AI Chat Assistant", type: "Portfolio", roles: "3/4 filled", color: "bg-secondary" },
      { name: "E-commerce Platform", type: "Practice", roles: "2/5 filled", color: "bg-primary" },
      { name: "DevOps Dashboard", type: "Startup-ready", roles: "5/6 filled", color: "bg-accent" },
    ].map((p) => (
      <div key={p.name} className="bg-card rounded-xl border border-border p-4 shadow-[var(--card-shadow)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 rounded-full ${p.color}`} />
          <div>
            <div className="font-semibold text-sm">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.type} • {p.roles}</div>
          </div>
        </div>
        <span className="text-xs font-medium text-secondary">Apply →</span>
      </div>
    ))}
  </div>
);

const TeamRoster = () => (
  <div className="bg-card rounded-2xl border border-border p-6 shadow-[var(--card-shadow)]">
    <div className="text-sm font-bold mb-4">Team Roster</div>
    {[
      { name: "Sarah K.", role: "Frontend Lead", status: "Active" },
      { name: "Mike L.", role: "Backend", status: "Active" },
      { name: "Open Position", role: "ML Engineer", status: "Hiring" },
    ].map((m) => (
      <div key={m.name} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
            {m.name[0]}
          </div>
          <div>
            <div className="text-sm font-medium">{m.name}</div>
            <div className="text-xs text-muted-foreground">{m.role}</div>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status === "Active" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
          {m.status}
        </span>
      </div>
    ))}
  </div>
);

const KanbanBoard = () => (
  <div className="bg-card rounded-2xl border border-border p-5 shadow-[var(--card-shadow)]">
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "To Do", items: ["API endpoints", "Auth flow"] },
        { label: "In Progress", items: ["Dashboard UI"] },
        { label: "Done", items: ["Setup CI/CD", "DB schema"] },
      ].map((col) => (
        <div key={col.label}>
          <div className="text-xs font-bold text-muted-foreground mb-2">{col.label}</div>
          <div className="space-y-2">
            {col.items.map((item) => (
              <div key={item} className="bg-muted rounded-lg p-2.5 text-xs font-medium">{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContributionGraph = () => (
  <div className="bg-card rounded-2xl border border-border p-6 shadow-[var(--card-shadow)]">
    <div className="flex items-end gap-1 h-24 mb-4">
      {[40, 65, 50, 80, 70, 90, 60, 85, 75, 95, 55, 88].map((h, i) => (
        <div key={i} className="flex-1 bg-secondary/20 rounded-t-sm relative overflow-hidden">
          <div className="absolute bottom-0 w-full bg-secondary rounded-t-sm transition-all" style={{ height: `${h}%` }} />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div><div className="text-lg font-bold">142</div><div className="text-xs text-muted-foreground">Tasks Done</div></div>
      <div><div className="text-lg font-bold">4.9</div><div className="text-xs text-muted-foreground">Peer Score</div></div>
      <div><div className="text-lg font-bold">12</div><div className="text-xs text-muted-foreground">Projects</div></div>
    </div>
  </div>
);

const ProofTimeline = () => (
  <div className="bg-card rounded-2xl border border-border p-6 shadow-[var(--card-shadow)]">
    {[
      { project: "AI Chat Assistant", role: "Frontend Lead", tasks: 28, date: "Mar 2025" },
      { project: "E-commerce MVP", role: "Full-Stack", tasks: 35, date: "Jan 2025" },
    ].map((p, i) => (
      <div key={i} className="flex gap-4 pb-4 mb-4 border-b border-border last:border-0 last:mb-0 last:pb-0">
        <div className="w-3 h-3 rounded-full bg-secondary mt-1 shrink-0" />
        <div>
          <div className="font-semibold text-sm">{p.project}</div>
          <div className="text-xs text-muted-foreground">{p.role} • {p.tasks} tasks • {p.date}</div>
        </div>
      </div>
    ))}
  </div>
);

const LeaderboardCard = () => (
  <div className="bg-card rounded-2xl border border-border p-6 shadow-[var(--card-shadow)]">
    {[
      { name: "Priya S.", score: 980, badge: "🏆" },
      { name: "James T.", score: 945, badge: "🥈" },
      { name: "Nina R.", score: 912, badge: "🥉" },
    ].map((u, i) => (
      <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
        <div className="flex items-center gap-3">
          <span className="text-lg">{u.badge}</span>
          <span className="text-sm font-medium">{u.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-secondary">{u.score}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">Open to refer</span>
        </div>
      </div>
    ))}
  </div>
);

const features: Feature[] = [
  {
    icon: User, badge: "Profile", title: "Your Skills, Your Direction",
    desc: "Tag-based skill system with goals (job, career switch, learning) and availability tracking.",
    highlights: ["Smart skill tagging", "Goal-based matching", "Availability status"],
    visual: <ProfileCard />,
  },
  {
    icon: FolderOpen, badge: "Marketplace", title: "Opportunities, Not Listings",
    desc: "Create or join projects with defined roles — Practice, Portfolio, or Startup-ready.",
    highlights: ["Role-based projects", "Multiple project types", "Team needs clarity"],
    visual: <ProjectCards />,
  },
  {
    icon: UsersRound, badge: "Teams", title: "Find Your Team. Build Together.",
    desc: "Apply to projects, get selected by role, and collaborate with owner approval.",
    highlights: ["Role-based selection", "Owner approval", "Team management"],
    visual: <TeamRoster />,
  },
  {
    icon: LayoutDashboard, badge: "Workspace", title: "Where Work Actually Happens",
    desc: "Task management with contribution visibility and lightweight collaboration tools.",
    highlights: ["Kanban boards", "Activity feeds", "Progress tracking"],
    visual: <KanbanBoard />,
  },
  {
    icon: BarChart3, badge: "USP", title: "Your Work Speaks for You",
    desc: "Track tasks, measure participation, receive peer feedback, and earn activity-based scores.",
    highlights: ["Contribution tracking", "Peer feedback", "Activity scoring"],
    visual: <ContributionGraph />,
  },
  {
    icon: FileText, badge: "Portfolio", title: "Show, Don't Tell",
    desc: "Projects completed, roles played, contributions made — all on a public, shareable profile.",
    highlights: ["Project timeline", "Role history", "Shareable profile"],
    visual: <ProofTimeline />,
  },
  {
    icon: Award, badge: "Referrals", title: "Get Seen. Get Referred.",
    desc: "'Open to refer' badges, top contributor highlights, and internal endorsements.",
    highlights: ["Referral badges", "Leaderboards", "Endorsements"],
    visual: <LeaderboardCard />,
  },
];

const FeatureSections = () => (
  <section id="features" className="py-24">
    <div className="container space-y-32">
      {features.map((f, i) => {
        const reversed = i % 2 === 1;
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? "lg:direction-rtl" : ""}`}
          >
            <div className={`space-y-6 ${reversed ? "lg:order-2" : ""}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                <f.icon size={14} /> {f.badge}
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              <ul className="space-y-2">
                {f.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className={reversed ? "lg:order-1" : ""}>
              {f.visual}
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default FeatureSections;
