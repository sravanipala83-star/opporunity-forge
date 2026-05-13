import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, FileText, Link2, Send, Sparkles, ChevronDown, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const SKILLS = [
  "React", "Next.js", "Vue", "Angular", "Svelte",
  "TypeScript", "JavaScript", "Node.js", "Python", "Go", "Rust", "Java", "C#", "Ruby",
  "AI/ML", "Data Science", "PyTorch", "TensorFlow", "LLMs",
  "UI/UX Design", "Figma", "Product Design", "Branding",
  "Product Management", "Marketing", "Content", "Copywriting",
  "DevOps", "AWS", "GCP", "Docker", "Kubernetes",
  "PostgreSQL", "MongoDB", "GraphQL", "REST APIs",
  "Mobile (iOS)", "Mobile (Android)", "React Native", "Flutter",
];

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectName: string;
}

const ApplyDialog = ({ open, onOpenChange, projectName }: ApplyDialogProps) => {
  const navigate = useNavigate();
  const [pitch, setPitch] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleSkill = (s: string) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setResumeName(f.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setPitch(""); setPortfolio(""); setResumeName(null); setSkills([]);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-secondary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Application sent</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The owner of <span className="font-medium text-foreground">{projectName}</span> will review your pitch and resume. You'll be notified once they accept or decline.
            </p>
            <div className="bg-muted/40 rounded-xl p-3 text-xs text-muted-foreground mb-6 inline-flex items-center gap-2">
              <Sparkles size={12} className="text-secondary" /> Status: Pending owner approval
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => { reset(); onOpenChange(false); }}>Close</Button>
              <Button variant="hero" onClick={() => { onOpenChange(false); navigate("/workspace"); }}>
                Preview workspace
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply to {projectName}</DialogTitle>
              <DialogDescription>
                Owner approval required. Tell them why you're a fit and share your work.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="pitch">Why you're a fit</Label>
                <Textarea
                  id="pitch"
                  required
                  rows={3}
                  maxLength={500}
                  placeholder="A short pitch — your background, what you'll bring, time you can commit."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                />
                <div className="text-[11px] text-muted-foreground text-right">{pitch.length}/500</div>
              </div>

              <div className="space-y-1.5">
                <Label>Your skills</Label>
                <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full min-h-10 flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-input bg-background text-left text-sm hover:border-secondary transition-colors"
                    >
                      <span className="flex flex-wrap gap-1.5 flex-1">
                        {skills.length === 0 ? (
                          <span className="text-muted-foreground">Select skills…</span>
                        ) : (
                          skills.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-medium"
                            >
                              {s}
                              <X
                                size={11}
                                onClick={(e) => { e.stopPropagation(); toggleSkill(s); }}
                                className="cursor-pointer hover:text-foreground"
                              />
                            </span>
                          ))
                        )}
                      </span>
                      <ChevronDown size={14} className="text-muted-foreground shrink-0" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search skills…" />
                      <CommandList>
                        <CommandEmpty>No skill found.</CommandEmpty>
                        <CommandGroup>
                          {SKILLS.map((s) => {
                            const selected = skills.includes(s);
                            return (
                              <CommandItem key={s} value={s} onSelect={() => toggleSkill(s)}>
                                <Check size={14} className={`mr-2 ${selected ? "opacity-100 text-secondary" : "opacity-0"}`} />
                                {s}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-[11px] text-muted-foreground">{skills.length} selected · search and pick multiple</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="portfolio" className="flex items-center gap-1.5"><Link2 size={13} /> Portfolio / GitHub link</Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://github.com/yourname"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resume" className="flex items-center gap-1.5"><FileText size={13} /> Resume (PDF)</Label>
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-colors text-sm text-muted-foreground"
                >
                  {resumeName ? (
                    <span className="text-foreground font-medium">{resumeName}</span>
                  ) : (
                    <span>Click to upload your resume (PDF)</span>
                  )}
                </label>
                <input id="resume" type="file" accept="application/pdf" className="hidden" onChange={handleFile} required />
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Checkbox id="terms" required className="mt-0.5" />
                <label htmlFor="terms">I confirm the work and resume submitted are my own.</label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" variant="hero">
                  <Send size={14} /> Submit application
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
