import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Video, Plus, Github, FileText, MessageCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, tasks, typeBadge, TaskStatus } from "@/data/mock";
import { cn } from "@/lib/utils";

const TABS = ["Tasks", "Team", "Resources", "Updates", "Chat"] as const;
type Tab = typeof TABS[number];

const COLUMNS: TaskStatus[] = ["Todo", "In Progress", "Done", "Blocked"];

const teamMembers = [
  { name: "Arjun Mehta", initial: "A", role: "Backend Dev" },
  { name: "Priya Sharma", initial: "P", role: "Frontend Dev" },
  { name: "Neha Reddy", initial: "N", role: "Creator · Full Stack" },
];

const Workspace = () => {
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>("Tasks");
  const project = projects.find((p) => p.id === id) ?? projects[0];

  // Logged in as Arjun (seeker) — Add Task disabled
  const isCreator = false;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-6 md:pt-10 pb-16">
        <Link to="/dashboard/seeker" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        {/* Top bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{project.title}</h1>
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold", typeBadge(project.type))}>{project.type}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Logged in as Arjun Mehta · Backend Dev</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 2).map((m) => (
                <div key={m.name} className="w-9 h-9 rounded-full bg-secondary/10 text-secondary border-2 border-background flex items-center justify-center font-bold text-sm">
                  {m.initial}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground border-2 border-background flex items-center justify-center font-bold text-[10px]">
                +1
              </div>
            </div>
            <Button variant="hero" size="sm" asChild>
              <a href="#"><Video size={14} /> Join Standup</a>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-medium transition-colors",
                  tab === t ? "text-secondary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
                {tab === t && (
                  <motion.div layoutId="tab-underline" className="absolute left-0 right-0 -bottom-px h-0.5 bg-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "Tasks" && (
              <div>
                <div className="flex justify-end mb-4">
                  <Button
                    size="sm"
                    variant="hero"
                    disabled={!isCreator}
                    title={isCreator ? "" : "Only the project creator can add tasks"}
                  >
                    <Plus size={14} /> Add Task
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {COLUMNS.map((col) => {
                    const list = tasks.filter((t) => t.status === col);
                    return (
                      <div key={col} className="bg-muted/40 rounded-xl p-3 min-h-[200px]">
                        <div className="flex items-center justify-between px-2 py-1 mb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{col}</h3>
                          <span className="text-xs text-muted-foreground">{list.length}</span>
                        </div>
                        <div className="space-y-2">
                          {list.map((t) => (
                            <div key={t.id} className="bg-card rounded-lg border border-border p-3 shadow-sm hover:shadow-[var(--card-shadow)] transition-shadow">
                              <p className="text-sm font-medium leading-snug mb-3">{t.title}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-bold">
                                    {t.assignee[0]}
                                  </div>
                                  <span className="text-[11px] text-muted-foreground">{t.assignee.split(" ")[0]}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground">{t.due}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "Team" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((m) => (
                  <div key={m.name} className="bg-card rounded-xl border border-border p-5 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                      {m.initial}
                    </div>
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Resources" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Github, label: "GitHub repo", url: "https://github.com" },
                  { icon: FileText, label: "Project brief", url: "#" },
                  { icon: Video, label: "Standup link (Meet)", url: "https://meet.google.com" },
                  { icon: MessageCircle, label: "Team Discord", url: "https://discord.com" },
                ].map((r) => (
                  <a
                    key={r.label}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-card rounded-xl border border-border p-5 flex items-center gap-3 hover:shadow-[var(--card-shadow)] transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                      <r.icon size={18} />
                    </div>
                    <div className="font-medium text-sm">{r.label}</div>
                  </a>
                ))}
              </div>
            )}

            {tab === "Updates" && (
              <div className="space-y-3">
                {[
                  { who: "Neha Reddy", text: "Sprint kickoff tomorrow at 6PM. Please update your tasks before standup.", time: "1h ago" },
                  { who: "Priya Sharma", text: "Pushed first version of the dashboard layout.", time: "4h ago" },
                  { who: "Arjun Mehta", text: "FastAPI scaffolding done — moving to resume parser.", time: "1d ago" },
                ].map((u, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                    <Bell size={16} className="text-secondary mt-0.5" />
                    <div>
                      <div className="text-sm"><span className="font-semibold">{u.who}</span> <span className="text-xs text-muted-foreground">· {u.time}</span></div>
                      <p className="text-sm text-muted-foreground mt-0.5">{u.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Chat" && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <MessageCircle size={32} className="mx-auto text-secondary mb-3" />
                <h3 className="font-bold mb-1">Team chat lives on Discord</h3>
                <p className="text-sm text-muted-foreground mb-4">Async chat, doubts and channels per role.</p>
                <Button variant="hero" size="sm" asChild>
                  <a href="https://discord.com" target="_blank" rel="noreferrer">Open Discord</a>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Workspace;