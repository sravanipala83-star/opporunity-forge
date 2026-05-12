import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, FileText, Users, User, Briefcase } from "lucide-react";
import DashboardLayout, { NavItem } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { projects, typeBadge, statusBadge, ProjectType } from "@/data/mock";
import { cn } from "@/lib/utils";

const items: NavItem[] = [
  { label: "Browse Projects", to: "/dashboard/seeker", icon: Compass },
  { label: "My Applications", to: "/dashboard/seeker/applications", icon: FileText },
  { label: "My Teams", to: "/dashboard/seeker/teams", icon: Users },
  { label: "My Profile", to: "/dashboard/seeker/profile", icon: User },
];

const filters: ("All" | ProjectType)[] = ["All", "Practice", "Portfolio", "Startup-ready"];

const SeekerDashboard = () => {
  const [filter, setFilter] = useState<"All" | ProjectType>("All");
  const visible = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <DashboardLayout user={{ name: "Arjun Mehta", role: "Backend Dev · Junior", initial: "A" }} items={items}>
      <div className="px-5 md:px-10 py-6 md:py-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Projects matching your skills</h1>
            <p className="text-sm text-muted-foreground mt-1">Curated from your profile · Python, FastAPI, PostgreSQL</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-secondary",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visible.map((p) => (
            <article
              key={p.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-bold text-lg leading-tight">{p.title}</h2>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold whitespace-nowrap", typeBadge(p.type))}>
                  {p.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <Briefcase size={12} /> by {p.creator}
              </p>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>

              <div className="space-y-1.5 mb-4">
                {p.roles.map((r) => (
                  <div key={r.title} className="flex items-center justify-between text-xs">
                    <span className="font-medium">
                      {r.title} <span className="text-muted-foreground">× {r.count}</span>
                    </span>
                    <div className="flex gap-1">
                      {r.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {p.filled}/{p.totalSlots} slots filled
                </span>
                {p.status === "Full" ? (
                  <span className={cn("text-xs px-3 py-1 rounded-full border font-semibold", statusBadge("Full"))}>
                    Team Full
                  </span>
                ) : (
                  <Button size="sm" variant="hero" asChild>
                    <Link to={`/workspace/${p.id}`}>Apply</Link>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeekerDashboard;