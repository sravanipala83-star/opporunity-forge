import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, FileText, Link2, Send, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SKILLS = ["React", "TypeScript", "Node.js", "Python", "AI/ML", "Design", "Product", "DevOps"];

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
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        skills.includes(s)
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "bg-card border-border text-muted-foreground hover:border-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
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
