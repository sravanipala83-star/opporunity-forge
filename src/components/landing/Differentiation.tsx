import { motion } from "framer-motion";
import { BookOpen, Briefcase, Rocket } from "lucide-react";

const items = [
  { icon: BookOpen, label: "Courses", desc: "Learning only", muted: true },
  { icon: Briefcase, label: "Job Portals", desc: "Opportunity waiting", muted: true },
  { icon: Rocket, label: "Opportiq", desc: "Experience creation", muted: false },
];

const Differentiation = () => (
  <section className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Beyond Courses. Beyond Job Portals.</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`text-center rounded-2xl p-8 border transition-all duration-300 ${
              item.muted
                ? "bg-muted/50 border-border"
                : "bg-hero-gradient text-primary-foreground border-transparent shadow-xl scale-105"
            }`}
          >
            <item.icon size={32} className={`mx-auto mb-4 ${item.muted ? "text-muted-foreground" : "text-primary-foreground"}`} />
            <h3 className={`text-lg font-bold mb-1 ${item.muted ? "" : "text-primary-foreground"}`}>{item.label}</h3>
            <p className={`text-sm ${item.muted ? "text-muted-foreground" : "text-primary-foreground/80"}`}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentiation;
