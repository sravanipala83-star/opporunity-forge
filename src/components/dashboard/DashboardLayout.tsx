import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number;
}

interface Props {
  user: { name: string; role: string; initial: string };
  items: NavItem[];
  children: ReactNode;
}

const DashboardLayout = ({ user, items, children }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-card flex-col">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight px-6 py-5 border-b border-border">
          Opport<span className="text-secondary">iq</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary/10 text-secondary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              <span className="flex items-center gap-3">
                <item.icon size={16} /> {item.label}
              </span>
              {item.badge ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-bold">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-border space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">
              {user.initial}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.role}</div>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("opportiq_role");
              navigate("/");
            }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-5 h-14 border-b border-border bg-card sticky top-0 z-30">
          <Link to="/" className="font-display font-extrabold text-lg">
            Opport<span className="text-secondary">iq</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">
            {user.initial}
          </div>
        </div>
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
        {items.slice(0, 4).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium relative",
                isActive ? "text-secondary" : "text-muted-foreground",
              )
            }
          >
            <item.icon size={18} />
            <span className="truncate max-w-[64px]">{item.label}</span>
            {item.badge ? (
              <span className="absolute top-1 right-1/4 text-[9px] px-1 py-0 rounded-full bg-secondary text-secondary-foreground font-bold">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;