import { LayoutGrid, Plus, Inbox, BarChart3, Check, X, MapPin } from "lucide-react";
import DashboardLayout, { NavItem } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { applications, projects, seekers } from "@/data/mock";
import { toast } from "@/hooks/use-toast";

const items: NavItem[] = [
  { label: "My Projects", to: "/dashboard/creator", icon: LayoutGrid },
  { label: "Create Project", to: "/dashboard/creator/new", icon: Plus },
  { label: "Applications", to: "/dashboard/creator/applications", icon: Inbox, badge: 3 },
  { label: "Analytics", to: "/dashboard/creator/analytics", icon: BarChart3 },
];

const ApplicationsInbox = () => {
  // Group by project
  const byProject = applications.reduce<Record<string, typeof applications>>((acc, a) => {
    (acc[a.projectId] ??= []).push(a);
    return acc;
  }, {});

  return (
    <DashboardLayout user={{ name: "Neha Reddy", role: "Full Stack · Senior", initial: "N" }} items={items}>
      <div className="px-5 md:px-10 py-6 md:py-10 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">Applications Inbox</h1>
        <p className="text-sm text-muted-foreground mb-8">Review applicants and build your team.</p>

        {Object.entries(byProject).map(([projectId, apps]) => {
          const project = projects.find((p) => p.id === projectId);
          if (!project) return null;
          return (
            <section key={projectId} className="mb-10">
              <h2 className="font-bold text-lg mb-4">
                {project.title} <span className="text-muted-foreground font-medium text-sm">({apps.length} applications)</span>
              </h2>
              <div className="space-y-3">
                {apps.map((app) => {
                  const seeker = seekers.find((s) => s.id === app.seekerId);
                  if (!seeker) return null;
                  return (
                    <article key={app.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-[var(--card-shadow)] transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-11 h-11 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold shrink-0">
                            {seeker.name[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline flex-wrap gap-x-2">
                              <h3 className="font-semibold">{seeker.name}</h3>
                              <span className="text-xs text-muted-foreground">applying as {app.appliedRole}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                              <span>{seeker.level}</span>
                              <span className="inline-flex items-center gap-1"><MapPin size={11} /> {seeker.city}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {seeker.skills.map((s) => (
                                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 italic">"{app.pitch}"</p>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2 md:w-32 shrink-0">
                          <Button
                            size="sm"
                            variant="hero"
                            className="flex-1"
                            onClick={() => toast({ title: "Approved", description: `${seeker.name} added to ${project.title}.` })}
                          >
                            <Check size={14} /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => toast({ title: "Rejected", description: `${seeker.name}'s application declined.` })}
                          >
                            <X size={14} /> Reject
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsInbox;