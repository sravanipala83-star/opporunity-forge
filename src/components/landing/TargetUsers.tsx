import { motion } from "framer-motion";
import { GraduationCap, RefreshCw, Code, Briefcase } from "lucide-react";

const users = [
  { icon: GraduationCap, label: "Fresh Graduates", desc: "Turn your degree into employable experience" },
  { icon: RefreshCw, label: "Career Switchers", desc: "Build proof in your new domain" },
  { icon: Code, label: "Self-Taught Developers", desc: "Validate skills with real projects" },
  { icon: Briefcase, label: "Early Professionals", desc: "Level up through collaboration" },
];

const TargetUsers = () => (
  <section id="community" className="py-24 bg-section-gradient">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Built for Builders</h2>
        <p className="text-lg text-muted-foreground">Whether you're starting out or switching paths, Opportiq meets you where you are.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
              <u.icon size={24} className="text-secondary" />
            </div>
            <h3 className="font-bold mb-1">{u.label}</h3>
            <p className="text-sm text-muted-foreground">{u.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TargetUsers;
