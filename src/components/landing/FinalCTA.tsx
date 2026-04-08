import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-hero-gradient rounded-3xl p-12 md:p-20 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight">
          Experience Is the New Resume.
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
          Stop waiting. Start building real experience that speaks louder than any certificate.
        </p>
        <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2">
          Start Building Today <ArrowRight size={16} />
        </Button>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
