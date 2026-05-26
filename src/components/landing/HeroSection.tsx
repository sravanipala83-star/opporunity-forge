import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-section-gradient" />
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Sparkles size={14} />
            Opportunity Collaboration Network
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Don't Wait for Opportunities.{" "}
            <span className="text-gradient">Build Them.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Opportiq helps you gain real experience, collaborate with peers, and turn your work into proof that gets you hired.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="gap-2" asChild>
              <Link to="/join">Join a Project <ArrowRight size={16} /></Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/start">Start Your Own</Link>
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" /> 2,400+ active members</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" /> 500+ projects</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border animate-float bg-card">
            <img src={heroDashboard} alt="Opportiq collaborative dashboard showing team projects and contribution stats" width={1280} height={800} className="w-full img-adapt" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
