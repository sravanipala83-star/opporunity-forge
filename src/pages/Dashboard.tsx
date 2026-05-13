import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  Send,
  Users,
  FolderKanban,
  Plus,
  Inbox,
  UserCircle2,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Clock,
  X,
  ArrowRight,
  ExternalLink,
  Github,
  LogOut,
  Linkedin,
  Globe,
  Save,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

type SectionKey =
  | "overview"
  | "browse"
  | "applications"
  | "teams"
  | "myProjects"
  | "create"
  | "inbox"
  | "profile";

type NavItem = { key: SectionKey; label: string; icon: LucideIcon };

const seekerNav: NavItem[] = [
  { key: "browse", label: "Browse Projects", icon: Compass },
  { key: "applications", label: "My Applications", icon: Send },
  { key: "teams", label: "My Teams", icon: Users },
];

const creatorNav: NavItem[] = [
  { key: "myProjects", label: "My Projects", icon: FolderKanban },
  { key: "create", label: "Create Project", icon: Plus },
  { key: "inbox", label: "Applications Inbox", icon: Inbox },
];

const sharedNav: NavItem[] = [
  { key: "profile", label: "My Profile", icon: UserCircle2 },
];

const mockUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
  bio: "Self-taught developer transitioning into product roles.",
  skills: ["React", "TypeScript", "UI/UX", "Node.js"],
  experience: "1 yr internship · 3 side projects",
  contributionScore: 78,
};

const mockProjects = [
  { id: 1, title: "AI Resume Reviewer", owner: "Priya N.", roles: ["Frontend", "ML"], members: 3, capacity: 5, tags: ["AI", "Web"] },
  { id: 2, title: "Local Events Discovery App", owner: "Karan V.", roles: ["Backend", "Design"], members: 2, capacity: 4, tags: ["Mobile", "API"] },
  { id: 3, title: "Open-Source Habit Tracker", owner: "Maya S.", roles: ["Full-Stack"], members: 4, capacity: 6, tags: ["OSS", "Productivity"] },
  { id: 4, title: "Climate Data Dashboard", owner: "Ravi K.", roles: ["Data", "Frontend"], members: 1, capacity: 4, tags: ["Data Viz"] },
];

const mockApplications = [
  { project: "AI Resume Reviewer", role: "Frontend", status: "pending", appliedAt: "2 days ago" },
  { project: "Local Events Discovery App", role: "Backend", status: "accepted", appliedAt: "1 week ago" },
  { project: "Crypto Portfolio Tracker", role: "Full-Stack", status: "declined", appliedAt: "3 weeks ago" },
];

const mockTeams = [
  { project: "Local Events Discovery App", role: "Backend", members: 3, repo: "github.com/karanv/local-events" },
];

const mockOwnedProjects = [
  { id: 10, title: "Study Planner with Reminders", status: "active", members: 3, openRoles: 1, applicants: 4 },
  { id: 11, title: "Indie Game Jam Toolkit", status: "recruiting", members: 1, openRoles: 3, applicants: 2 },
];

const mockInbox = [
  { name: "Tara R.", project: "Study Planner with Reminders", role: "Designer", pitch: "5 yrs in product design, ~6 hrs/week.", skills: ["Figma", "Design Systems"] },
  { name: "Sam P.", project: "Indie Game Jam Toolkit", role: "Backend", pitch: "Go + Postgres background. Love game tooling.", skills: ["Go", "PostgreSQL"] },
  { name: "Lena K.", project: "Indie Game Jam Toolkit", role: "Frontend", pitch: "React + Three.js, comfortable with WebGL.", skills: ["React", "Three.js"] },
];

const Dashboard = () => {
  const [active, setActive] = useState<SectionKey>("overview");
  const [mode, setMode] = useState<"seeker" | "creator">("seeker");
  const navigate = useNavigate();

  const handleSignOut = () => {
    toast({ title: "Signed out", description: "You've been returned to the landing page." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-section-gradient flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-border bg-card/60 backdrop-blur sticky top-0 h-screen">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight px-6 h-16 flex items-center border-b border-border">
          Opport<span className="text-secondary">iq</span>
        </Link>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm">
          <NavBtn item={{ key: "overview", label: "Overview", icon: LayoutDashboard }} active={active} setActive={setActive} />

          <SectionLabel>Seeker</SectionLabel>
          {seekerNav.map((i) => <NavBtn key={i.key} item={i} active={active} setActive={setActive} />)}

          <div className="my-3 border-t border-border" />

          <SectionLabel>Creator</SectionLabel>
          {creatorNav.map((i) => <NavBtn key={i.key} item={i} active={active} setActive={setActive} />)}

          <div className="my-3 border-t border-border" />

          {sharedNav.map((i) => <NavBtn key={i.key} item={i} active={active} setActive={setActive} />)}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
              {mockUser.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{mockUser.name}</div>
              <div className="text-xs text-muted-foreground truncate">{mockUser.email}</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
            <LogOut size={14} /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar with mode toggle */}
        <div className="h-16 border-b border-border bg-card/60 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-lg capitalize">
              {active === "overview" ? "Dashboard" : active === "myProjects" ? "My Projects" : active.replace(/([A-Z])/g, " $1")}
            </h1>
            <Badge variant="secondary" className="text-[10px]">Preview · Mock data</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1 rounded-lg bg-muted">
              <button
                onClick={() => setMode("seeker")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${mode === "seeker" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Seeker mode
              </button>
              <button
                onClick={() => setMode("creator")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${mode === "creator" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Creator mode
              </button>
            </div>
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleSignOut} className="hidden md:inline-flex">
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="p-6 md:p-8 max-w-6xl">
          {active === "overview" && <Overview mode={mode} setActive={setActive} />}
          {active === "browse" && <Browse />}
          {active === "applications" && <Applications />}
          {active === "teams" && <Teams />}
          {active === "myProjects" && <MyProjects />}
          {active === "create" && <CreateProject />}
          {active === "inbox" && <ApplicationsInbox />}
          {active === "profile" && <Profile />}
        </motion.div>
      </main>
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{children}</div>
);

const NavBtn = ({ item, active, setActive }: { item: NavItem; active: SectionKey; setActive: (k: SectionKey) => void }) => {
  const Icon = item.icon;
  const isActive = active === item.key;
  return (
    <button
      onClick={() => setActive(item.key)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition ${
        isActive ? "bg-secondary/15 text-secondary font-semibold" : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon size={16} />
      <span>{item.label}</span>
    </button>
  );
};

/* ---------------- Sections ---------------- */

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) => (
  <div className="bg-card border border-border rounded-2xl p-5 shadow-[var(--card-shadow)]">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Icon size={16} className="text-secondary" />
    </div>
    <div className="text-2xl font-extrabold">{value}</div>
  </div>
);

const Overview = ({ mode, setActive }: { mode: "seeker" | "creator"; setActive: (k: SectionKey) => void }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight">Welcome back, {mockUser.name.split(" ")[0]} 👋</h2>
      <p className="text-muted-foreground text-sm mt-1">
        You're in <span className="font-semibold text-foreground">{mode === "seeker" ? "Seeker" : "Creator"}</span> mode. Switch anytime from the top bar.
      </p>
    </div>

    {mode === "seeker" ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active applications" value="3" icon={Send} />
        <StatCard label="Teams joined" value="1" icon={Users} />
        <StatCard label="Contribution score" value={`${mockUser.contributionScore}/100`} icon={Sparkles} />
        <StatCard label="Projects browsed" value="12" icon={Compass} />
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Projects owned" value="2" icon={FolderKanban} />
        <StatCard label="Pending applicants" value="3" icon={Inbox} />
        <StatCard label="Open roles" value="4" icon={Briefcase} />
        <StatCard label="Active teammates" value="4" icon={Users} />
      </div>
    )}

    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-[var(--card-shadow)]">
        <h3 className="font-bold mb-4">Quick actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="hero" onClick={() => setActive("browse")}><Compass size={14} /> Browse projects</Button>
          <Button variant="outline" onClick={() => setActive("create")}><Plus size={14} /> Create project</Button>
          <Button variant="outline" onClick={() => setActive("applications")}><Send size={14} /> My applications</Button>
          <Button variant="outline" onClick={() => setActive("inbox")}><Inbox size={14} /> Review applicants</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-[var(--card-shadow)]">
        <h3 className="font-bold mb-4">Recent activity</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-secondary mt-1" /> <div><span className="font-medium">Karan V.</span> accepted your application to <span className="font-medium">Local Events Discovery App</span></div></li>
          <li className="flex items-start gap-3"><Send size={14} className="text-primary mt-1" /> <div>You applied to <span className="font-medium">AI Resume Reviewer</span></div></li>
          <li className="flex items-start gap-3"><Inbox size={14} className="text-secondary mt-1" /> <div>3 new applicants for <span className="font-medium">Indie Game Jam Toolkit</span></div></li>
        </ul>
      </div>
    </div>
  </div>
);

const Browse = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">Discover projects looking for teammates. Apply with your pitch, skills, and resume.</p>
    <div className="grid md:grid-cols-2 gap-4">
      {mockProjects.map((p) => (
        <div key={p.id} className="bg-card border border-border rounded-2xl p-5 shadow-[var(--card-shadow)]">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold">{p.title}</h3>
            <Badge variant="outline" className="text-[10px]">{p.members}/{p.capacity}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">by {p.owner}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.tags.map((t) => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{t}</span>)}
          </div>
          <div className="text-xs text-muted-foreground mb-4">Open roles: {p.roles.join(", ")}</div>
          <Button variant="hero" size="sm" className="w-full">Apply <ArrowRight size={14} /></Button>
        </div>
      ))}
    </div>
  </div>
);

const statusColor = (s: string) =>
  s === "accepted" ? "text-secondary bg-secondary/10" : s === "declined" ? "text-destructive bg-destructive/10" : "text-primary bg-primary/10";

const Applications = () => (
  <div className="bg-card border border-border rounded-2xl shadow-[var(--card-shadow)] divide-y divide-border">
    {mockApplications.map((a, i) => (
      <div key={i} className="p-5 flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-sm">{a.project}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Applied as {a.role} · {a.appliedAt}</div>
        </div>
        <span className={`text-[11px] px-2 py-1 rounded-full font-semibold capitalize ${statusColor(a.status)}`}>{a.status}</span>
      </div>
    ))}
  </div>
);

const Teams = () => (
  <div className="space-y-4">
    {mockTeams.map((t) => (
      <div key={t.project} className="bg-card border border-border rounded-2xl p-6 shadow-[var(--card-shadow)]">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold">{t.project}</h3>
            <p className="text-xs text-muted-foreground">Your role: {t.role} · {t.members} teammates</p>
          </div>
          <Button variant="outline" size="sm" asChild><Link to="/workspace">Open workspace <ExternalLink size={12} /></Link></Button>
        </div>
        <a href={`https://${t.repo}`} target="_blank" rel="noreferrer" className="text-xs text-secondary inline-flex items-center gap-1 hover:underline">
          <Github size={12} /> {t.repo}
        </a>
      </div>
    ))}
  </div>
);

const MyProjects = () => (
  <div className="grid md:grid-cols-2 gap-4">
    {mockOwnedProjects.map((p) => (
      <div key={p.id} className="bg-card border border-border rounded-2xl p-5 shadow-[var(--card-shadow)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold">{p.title}</h3>
          <Badge variant="secondary" className="capitalize text-[10px]">{p.status}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center my-4">
          <div><div className="text-xl font-extrabold">{p.members}</div><div className="text-[10px] text-muted-foreground uppercase">Members</div></div>
          <div><div className="text-xl font-extrabold">{p.openRoles}</div><div className="text-[10px] text-muted-foreground uppercase">Open</div></div>
          <div><div className="text-xl font-extrabold">{p.applicants}</div><div className="text-[10px] text-muted-foreground uppercase">Applicants</div></div>
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild><Link to="/workspace">Open workspace <ExternalLink size={12} /></Link></Button>
      </div>
    ))}
  </div>
);

const CreateProject = () => (
  <div className="bg-card border border-border rounded-2xl p-8 shadow-[var(--card-shadow)] text-center max-w-xl">
    <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-4">
      <Plus size={20} className="text-secondary" />
    </div>
    <h3 className="font-bold text-lg mb-1">Start a new project</h3>
    <p className="text-sm text-muted-foreground mb-5">Define your idea, pick the roles you need, and start receiving applications from collaborators.</p>
    <Button variant="hero" asChild><Link to="/start">Launch project setup <ArrowRight size={14} /></Link></Button>
  </div>
);

const ApplicationsInbox = () => (
  <div className="space-y-3">
    {mockInbox.map((r, i) => (
      <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-[var(--card-shadow)] flex flex-col md:flex-row gap-4 md:items-center">
        <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold shrink-0">{r.name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-sm">{r.name}</span>
            <span className="text-xs text-muted-foreground">→ {r.project} · {r.role}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{r.pitch}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {r.skills.map((s) => <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{s}</span>)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="hero" size="sm"><CheckCircle2 size={14} /> Accept</Button>
          <Button variant="outline" size="sm"><X size={14} /> Decline</Button>
        </div>
      </div>
    ))}
  </div>
);

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    bio: mockUser.bio,
    experience: mockUser.experience,
    github: "github.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    portfolio: "alexmorgan.dev",
    skills: mockUser.skills,
  });

  const save = () => {
    setEditing(false);
    toast({ title: "Profile updated", description: "Your profile is now visible to project owners." });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[var(--card-shadow)] max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-extrabold text-xl">{mockUser.name[0]}</div>
          <div>
            <h2 className="text-xl font-extrabold">{mockUser.name}</h2>
            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
          </div>
        </div>
        {editing ? (
          <Button variant="hero" size="sm" onClick={save}><Save size={14} /> Save</Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Pencil size={14} /> Edit</Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 mb-6">
        Tip: Add your bio, experience, and professional links here. Project owners review this when you apply, so you don't need to repeat it on every application.
      </p>

      <div className="space-y-5">
        <ProfileField label="Short bio" editing={editing} value={profile.bio} multiline
          onChange={(v) => setProfile({ ...profile, bio: v })}
          placeholder="One or two sentences about you." />
        <ProfileField label="Experience" editing={editing} value={profile.experience}
          onChange={(v) => setProfile({ ...profile, experience: v })}
          placeholder="e.g. 1 yr internship, 3 side projects" />

        <div>
          <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Skills</div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-medium">{s}</span>)}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Professional links</div>
          <div className="grid sm:grid-cols-1 gap-3">
            <LinkField icon={Github} label="GitHub" editing={editing} value={profile.github}
              onChange={(v) => setProfile({ ...profile, github: v })} prefix="https://" />
            <LinkField icon={Linkedin} label="LinkedIn" editing={editing} value={profile.linkedin}
              onChange={(v) => setProfile({ ...profile, linkedin: v })} prefix="https://" />
            <LinkField icon={Globe} label="Portfolio" editing={editing} value={profile.portfolio}
              onChange={(v) => setProfile({ ...profile, portfolio: v })} prefix="https://" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
          <Sparkles size={18} className="text-secondary shrink-0" />
          <div>
            <div className="text-sm font-semibold">Contribution score: {mockUser.contributionScore}/100</div>
            <p className="text-xs text-muted-foreground">Built from tasks shipped, peer feedback, and project participation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label, value, editing, onChange, multiline, placeholder,
}: { label: string; value: string; editing: boolean; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }) => (
  <div>
    <Label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">{label}</Label>
    {editing ? (
      multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )
    ) : (
      <div className="text-sm">{value || <span className="text-muted-foreground italic">Not set</span>}</div>
    )}
  </div>
);

const LinkField = ({
  icon: Icon, label, value, editing, onChange, prefix,
}: { icon: LucideIcon; label: string; value: string; editing: boolean; onChange: (v: string) => void; prefix?: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
      <Icon size={16} className="text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      {editing ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={`${label.toLowerCase()}.com/yourname`} className="h-8 mt-0.5" />
      ) : value ? (
        <a href={`${prefix || ""}${value}`} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:underline truncate block">
          {value}
        </a>
      ) : (
        <span className="text-sm text-muted-foreground italic">Not set</span>
      )}
    </div>
  </div>
);

export default Dashboard;