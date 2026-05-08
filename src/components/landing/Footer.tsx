import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container grid gap-8 md:grid-cols-4 text-sm">
      <div>
        <Link to="/" className="font-display font-extrabold text-lg text-foreground">
          Opport<span className="text-secondary">iq</span>
        </Link>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          The opportunity collaboration network — gain experience by building real things, together.
        </p>
      </div>
      <div>
        <div className="font-semibold mb-3 text-foreground">Product</div>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
          <li><Link to="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link></li>
          <li><Link to="/workspace" className="hover:text-foreground transition-colors">Workspace preview</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-3 text-foreground">Get started</div>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/join" className="hover:text-foreground transition-colors">Join a project</Link></li>
          <li><Link to="/start" className="hover:text-foreground transition-colors">Start your own</Link></li>
          <li><Link to="/#community" className="hover:text-foreground transition-colors">For builders</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-3 text-foreground">Company</div>
        <ul className="space-y-2 text-muted-foreground">
          <li><a href="mailto:hello@opportiq.app" className="hover:text-foreground transition-colors">Contact</a></li>
          <li><Link to="/" className="hover:text-foreground transition-colors">Privacy</Link></li>
          <li><Link to="/" className="hover:text-foreground transition-colors">Terms</Link></li>
        </ul>
      </div>
    </div>
    <div className="container mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
      © {new Date().getFullYear()} Opportiq. All rights reserved.
    </div>
  </footer>
);

export default Footer;
