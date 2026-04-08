import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search, Users, Sparkles, CheckCircle2 } from "lucide-react";

const interests = ["Frontend", "Backend", "AI/ML", "Design", "DevOps", "Mobile", "Data Science", "Product"];
const projectTypes = ["Practice", "Portfolio", "Startup-ready"];

const sampleProjects = [
  { name: "AI Study Buddy", type: "Portfolio", team: "3/5 filled", skills: ["React", "Python", "AI/ML"] },
  { name: "Fitness Tracker App", type: "Practice", team: "2/4 filled", skills: ["React Native", "Node.js"] },
  { name: "SaaS Analytics Dashboard", type: "Startup-ready", team: "4/6 filled", skills: ["Next.js", "PostgreSQL", "Charts"] },
  { name: "Open Source CLI Tool", type: "Practice", team: "1/3 filled", skills: ["Go", "DevOps"] },
];

const JoinProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const filteredProjects = sampleProjects.filter((p) => {
    if (selectedType && p.type !== selectedType) return false;
    if (selectedInterests.length > 0 && !p.skills.some((s) => selectedInterests.some((i) => s.toLowerCase().includes(i.toLowerCase())))) return false;
    return true;
  });

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : sampleProjects;

  const steps = [
    {
      title: "What are you interested in?",
      subtitle: "Select your skills and interests to find the right projects.",
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedInterests.includes(interest)
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-card border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          {selectedInterests.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Selected: <span className="text-foreground font-medium">{selectedInterests.join(", ")}</span>
            </p>
          )}
        </div>
      ),
    },
    {
      title: "What type of project?",
      subtitle: "Choose what fits your current goals.",
      icon: Search,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                selectedType === type
                  ? "bg-secondary/10 border-secondary"
                  : "bg-card border-border hover:border-secondary/50"
              }`}
            >
              <div className="font-bold text-sm mb-1">{type}</div>
              <div className="text-xs text-muted-foreground">
                {type === "Practice" && "Learn and experiment freely"}
                {type === "Portfolio" && "Build something showcase-worthy"}
                {type === "Startup-ready" && "Ship a real product"}
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Projects for you",
      subtitle: "Based on your interests, here are matching projects.",
      icon: Users,
      content: (
        <div className="space-y-3">
          {displayProjects.map((project) => (
            <div key={project.name} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-[var(--card-shadow)] transition-shadow">
              <div>
                <div className="font-semibold text-sm">{project.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{project.type} • {project.team}</div>
                <div className="flex gap-2 mt-2">
                  {project.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <Button variant="secondary" size="sm">Apply</Button>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-2">
            This is a preview — sign up to see all projects and apply.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-section-gradient">
      <div className="container max-w-2xl pt-24 pb-16">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to home
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${i <= step ? "bg-secondary" : "bg-border"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              {(() => {
                const Icon = steps[step].icon;
                return <Icon size={20} className="text-secondary" />;
              })()}
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{steps[step].title}</h1>
            </div>
            <p className="text-muted-foreground mb-8">{steps[step].subtitle}</p>
            {steps[step].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ArrowLeft size={16} /> Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="hero" onClick={() => setStep(step + 1)}>
              Next <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="hero" className="gap-2">
              <CheckCircle2 size={16} /> Sign Up to Apply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinProject;
