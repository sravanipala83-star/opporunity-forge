import { motion } from "framer-motion";
import { BookOpen, Users, ShieldCheck } from "lucide-react";

const items = [
  { icon: BookOpen, title: "Work on real projects", desc: "Apply skills in structured, team-based scenarios — not toy exercises." },
  { icon: Users, title: "Collaborate in teams", desc: "Join cross-functional teams, define roles, and ship together." },
  { icon: ShieldCheck, title: "Build verifiable proof", desc: "Every contribution tracked, scored, and shareable on your profile." },
];

const ValueProposition = () => (
  <section className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">From Learning to <span className="text-gradient">Employability</span></h2>
        <p className="text-lg text-muted-foreground">Most platforms teach skills. Opportiq helps you apply them in real-world scenarios.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
              <item.icon size={22} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProposition;
