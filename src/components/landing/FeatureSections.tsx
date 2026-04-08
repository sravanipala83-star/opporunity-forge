import { motion } from "framer-motion";
import { User, FolderOpen, UsersRound, LayoutDashboard, BarChart3, FileText, Award } from "lucide-react";

interface Feature {
  icon: typeof User;
  badge: string;
  title: string;
  desc: string;
  highlights: string[];
}

const features: Feature[] = [
  {
    icon: User, badge: "Profile", title: "Your Skills, Your Direction",
    desc: "Tag-based skill system with goals (job, career switch, learning) and availability tracking.",
    highlights: ["Smart skill tagging", "Goal-based matching", "Availability status"],
  },
  {
    icon: FolderOpen, badge: "Marketplace", title: "Opportunities, Not Listings",
    desc: "Create or join projects with defined roles — Practice, Portfolio, or Startup-ready.",
    highlights: ["Role-based projects", "Multiple project types", "Team needs clarity"],
  },
  {
    icon: UsersRound, badge: "Teams", title: "Find Your Team. Build Together.",
    desc: "Apply to projects, get selected by role, and collaborate with owner approval.",
    highlights: ["Role-based selection", "Owner approval", "Team management"],
  },
  {
    icon: LayoutDashboard, badge: "Workspace", title: "Where Work Actually Happens",
    desc: "Task management with contribution visibility and lightweight collaboration tools.",
    highlights: ["Task tracking", "Activity feeds", "Progress visibility"],
  },
  {
    icon: BarChart3, badge: "USP", title: "Your Work Speaks for You",
    desc: "Track tasks, measure participation, receive peer feedback, and earn activity-based scores.",
    highlights: ["Contribution tracking", "Peer feedback", "Activity scoring"],
  },
  {
    icon: FileText, badge: "Portfolio", title: "Show, Don't Tell",
    desc: "Projects completed, roles played, contributions made — all on a public, shareable profile.",
    highlights: ["Project timeline", "Role history", "Shareable profile"],
  },
  {
    icon: Award, badge: "Referrals", title: "Get Seen. Get Referred.",
    desc: "'Open to refer' badges, top contributor highlights, and internal endorsements.",
    highlights: ["Referral badges", "Leaderboards", "Endorsements"],
  },
];

const FeatureSections = () => (
  <section id="features" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Everything You Need to <span className="text-gradient">Build Experience</span></h2>
        <p className="text-lg text-muted-foreground">A complete ecosystem — from finding teams to proving your skills.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl p-7 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                <f.icon size={20} className="text-secondary" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary">{f.badge}</span>
                <h3 className="text-base font-bold leading-snug">{f.title}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
            <ul className="space-y-1.5">
              {f.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSections;
