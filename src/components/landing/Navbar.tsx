import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = ["Features", "How It Works", "Community"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display font-800 text-xl tracking-tight text-foreground">
          Opport<span className="text-secondary">iq</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
          <Button variant="hero" size="sm">Get Started</Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <Button variant="hero" size="sm" className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
