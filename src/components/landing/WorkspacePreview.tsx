import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Video, MessageCircle, Github, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: Video,
    title: "Calls on Zoom or Meet",
    desc: "Each project workspace lets your team drop a call link. No new video tool to learn — use what you already trust.",
  },
  {
    icon: MessageCircle,
    title: "Async chat & doubts on Discord",
    desc: "Spin up channels per role. Ask doubts, share progress, keep async-friendly logs the whole team can read.",
  },
  {
    icon: Github,
    title: "Codebase lives on GitHub",
    desc: "Link the project's repo. Contributions, PRs and commits become part of your verifiable proof of work.",
  },
];

const WorkspacePreview = () => (
  <section id="workspace" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          How Teams Actually <span className="text-gradient">Collaborate</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          We don't reinvent the tools you already love. Opportiq plugs into them so your team can talk, ship, and prove their work.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {tools.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-7 border border-border shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <t.icon size={20} className="text-secondary" />
            </div>
            <h3 className="font-bold mb-2">{t.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="hero" asChild className="gap-2">
          <Link to="/workspace">See a live workspace preview <ArrowRight size={16} /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default WorkspacePreview;