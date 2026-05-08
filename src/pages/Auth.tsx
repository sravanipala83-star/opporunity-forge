import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = params.get("mode") === "login" ? "login" : "signup";
  const redirect = params.get("redirect") || "/";
  const [tab, setTab] = useState(initial);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent, mode: "login" | "signup") => {
    e.preventDefault();
    setLoading(true);
    // Frontend-only stub. Real auth requires Lovable Cloud.
    setTimeout(() => {
      setLoading(false);
      toast({
        title: mode === "signup" ? "Account ready (preview)" : "Signed in (preview)",
        description: "Auth backend isn't connected yet — this is a UI preview.",
      });
      navigate(redirect);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-section-gradient flex flex-col">
      <div className="container max-w-md pt-20 pb-16 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-[var(--card-shadow)]"
        >
          <Link to="/" className="font-display font-extrabold text-2xl tracking-tight block mb-1">
            Opport<span className="text-secondary">iq</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6">
            Join the collaboration network.
          </p>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                <Field icon={User} label="Full name" id="name" type="text" placeholder="Jane Doe" required />
                <Field icon={Mail} label="Email" id="email" type="email" placeholder="you@example.com" required />
                <Field icon={Lock} label="Password" id="password" type="password" placeholder="••••••••" required minLength={8} />
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? "Creating…" : "Create account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                <Field icon={Mail} label="Email" id="login-email" type="email" placeholder="you@example.com" required />
                <Field icon={Lock} label="Password" id="login-password" type="password" placeholder="••••••••" required />
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Log in"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              toast({ title: "GitHub OAuth", description: "Connect Lovable Cloud to enable real sign-in." })
            }
          >
            <Github size={16} /> Continue with GitHub
          </Button>

          <p className="text-[11px] text-muted-foreground text-center mt-6">
            UI preview — no backend yet. Connect Lovable Cloud to enable real accounts.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Field = ({
  icon: Icon,
  label,
  id,
  ...props
}: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input id={id} className="pl-9" {...props} />
    </div>
  </div>
);

export default Auth;
