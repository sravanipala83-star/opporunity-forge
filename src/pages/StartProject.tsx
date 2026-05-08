import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lightbulb, Users, Settings, CheckCircle2 } from "lucide-react";

const roleOptions = ["Frontend", "Backend", "Full-Stack", "Design", "AI/ML", "DevOps", "Product", "QA"];
const typeOptions = ["Practice", "Portfolio", "Startup-ready"];

const StartProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const steps = [
    {
      title: "Describe your project",
      subtitle: "What do you want to build? Give it a name and a brief description.",
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., AI-powered Study Planner"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Brief Description</label>
            <textarea
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder="What problem does it solve? What will the team build?"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow resize-none"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Choose project type",
      subtitle: "This helps collaborators understand the commitment level.",
      icon: Settings,
      content: (
        <div className="grid gap-4">
          {typeOptions.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                selectedType === type
                  ? "bg-secondary/10 border-secondary"
                  : "bg-card border-border hover:border-secondary/50"
              }`}
            >
              <div className="font-bold text-sm mb-1">{type}</div>
              <div className="text-xs text-muted-foreground">
                {type === "Practice" && "Low commitment — learn and experiment together"}
                {type === "Portfolio" && "Medium commitment — build something showcase-worthy"}
                {type === "Startup-ready" && "High commitment — ship a real, usable product"}
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Define team roles",
      subtitle: "What roles do you need? You can always add more later.",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {roleOptions.map((role) => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedRoles.includes(role)
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-card border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          {selectedRoles.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="text-sm font-bold mb-3">Project Preview</div>
              <div className="text-sm font-semibold">{projectName || "Untitled Project"}</div>
              <div className="text-xs text-muted-foreground mt-1 mb-3">{selectedType || "No type"} • {selectedRoles.length} roles</div>
              <div className="flex flex-wrap gap-2">
                {selectedRoles.map((r) => (
                  <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{r}</span>
                ))}
              </div>
            </div>
          )}
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
            <Button
              variant="hero"
              className="gap-2"
              onClick={() => navigate("/auth?redirect=/start")}
            >
              <CheckCircle2 size={16} /> Sign Up to Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartProject;
