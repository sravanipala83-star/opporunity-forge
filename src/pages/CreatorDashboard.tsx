import { Link } from "react-router-dom";
import { LayoutGrid, Plus, Inbox, BarChart3, Edit3, ExternalLink } from "lucide-react";
import DashboardLayout, { NavItem } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { projects, typeBadge, statusBadge } from "@/data/mock";
import { cn } from "@/lib/utils";

const items: NavItem[] = [
  { label: "My Projects", to: "/dashboard/creator", icon: LayoutGrid },
  { label: "Create Project", to: "/dashboard/creator/new", icon: Plus },
  { label: "Applications", to: "/dashboard/creator/applications", icon: Inbox, badge: 3 },
  { label: "Analytics", to: "/dashboard/creator/analytics", icon: BarChart3 },
];

const CreatorDashboard = () => {
  const mine = projects.filter((p) => p.creator === "Neha Reddy");

  return (
    <DashboardLayout user={{ name: "Neha Reddy", role: "Full Stack · Senior", initial: "N" }} items={items}>
      <div className="px-5 md:px-10 py-6 md:py-10 max-w-6xl">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">My Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your active and past project teams.</p>
          </div>
          <Button variant="hero" size="sm" asChild>
            <Link to="/dashboard/creator/new"><Plus size={14} /> New Project</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mine.map((p) => (
            <article key={p.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-[var(--card-shadow-hover)] transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-bold text-lg leading-tight">{p.title}</h2>
                  <div className="flex gap-2 mt-1.5">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold", typeBadge(p.type))}>{p.type}</span>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold", statusBadge(p.status))}>{p.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Applications</div>
                  <div className="text-xl font-extrabold">{p.applications}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Slots filled</div>
                  <div className="text-xl font-extrabold">{p.filled}<span className="text-sm text-muted-foreground font-medium">/{p.totalSlots}</span></div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border">
                <Button size="sm" variant="outline" className="flex-1"><Edit3 size={14} /> Edit</Button>
                <Button size="sm" variant="hero" className="flex-1" asChild>
                  <Link to={`/workspace/${p.id}`}><ExternalLink size={14} /> View</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatorDashboard;