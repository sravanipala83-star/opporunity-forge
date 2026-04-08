import { motion } from "framer-motion";
import { UserPlus, Search, Users, Hammer, Trophy, Eye } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Sign up & define skills" },
  { icon: Search, label: "Discover projects" },
  { icon: Users, label: "Join or create a team" },
  { icon: Hammer, label: "Contribute to real work" },
  { icon: Trophy, label: "Build proof of work" },
  { icon: Eye, label: "Get visibility & referrals" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-section-gradient">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">How It Works</h2>
        <p className="text-lg text-muted-foreground">Six steps from sign-up to getting hired.</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-card border border-border shadow-[var(--card-shadow)] flex items-center justify-center mb-4">
              <step.icon size={24} className="text-secondary" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <p className="text-sm font-medium leading-snug">{step.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
