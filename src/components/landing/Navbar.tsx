import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks: { label: string; hash: string }[] = [
  { label: "Features", hash: "#features" },
  { label: "How It Works", hash: "#how-it-works" },
  { label: "Community", hash: "#community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToHash = (hash: string) => {
    setOpen(false);
    if (pathname !== "/") {
      navigate("/" + hash);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight text-foreground">
          Opport<span className="text-secondary">iq</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => goToHash(l.hash)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Link to="/workspace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Workspace
          </Link>
          <Button variant="hero" size="sm" asChild>
            <Link to="/join">Get Started</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => goToHash(l.hash)}
              className="block w-full text-left text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </button>
          ))}
          <Link to="/workspace" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">
            Workspace
          </Link>
          <Button variant="hero" size="sm" className="w-full" asChild>
            <Link to="/join" onClick={() => setOpen(false)}>Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
