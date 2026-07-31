import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isUK = location.pathname.startsWith("/uk");
  const isUSA = location.pathname.startsWith("/usa");

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-soft-xs">
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between h-[70px]">
        {/* Logo with three lines icon and colored text */}
        <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
          {/* Three lines icon */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="flex flex-col gap-[3px] w-7">
              <div className="h-[3.5px] bg-primary rounded-sm"></div>
              <div className="h-[3.5px] rounded-sm flex gap-[4px]">
                <div className="h-full bg-destructive rounded-sm flex-1"></div>
                <div className="h-full bg-destructive rounded-sm flex-1"></div>
              </div>
              <div className="h-[3.5px] bg-primary rounded-sm"></div>
            </div>
          </div>
          
          {/* Text logo - Tax|Band|Check with colors */}
          <div className="flex items-baseline gap-0 font-bold text-[19px] leading-none tracking-tight">
            <span className="text-primary">Tax</span>
            <span className="text-destructive">Band</span>
            <span className="text-primary">Check</span>
          </div>
        </Link>

        {/* Desktop nav - clean with blue color for active tab */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/uk"
            className={`px-1 py-2 text-sm font-medium transition-colors ${
              isUK ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-base">🇬🇧</span>
              UK
            </span>
          </Link>
          <Link
            to="/usa"
            className={`px-1 py-2 text-sm font-medium transition-colors ${
              isUSA ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-base">🇺🇸</span>
              USA
            </span>
          </Link>
        </nav>

        {/* CTA - clean Apple style button */}
        <Link
          to="/uk"
          className="hidden md:inline-flex items-center justify-center bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          Start Free Check
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground p-2.5 rounded-xl hover:bg-secondary/70 transition-colors active:scale-95"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown - friendly and spacious */}
      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-t border-border px-5 pb-5 pt-3 animate-fade-in">
          <div className="flex flex-col gap-2">
            <Link
              to="/uk"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                isUK
                  ? "bg-primary text-primary-foreground shadow-soft-sm"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              <span className="text-xl">🇬🇧</span>
              UK Council Tax
            </Link>
            <Link
              to="/usa"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                isUSA
                  ? "bg-primary text-primary-foreground shadow-soft-sm"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              <span className="text-xl">🇺🇸</span>
              USA Property Tax
            </Link>
            
            <div className="h-px bg-border my-2"></div>
            
            <Link
              to="/uk"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-base font-bold px-6 py-4 rounded-full hover:bg-primary-light transition-all shadow-soft-md active:scale-95"
            >
              🚀 Start Free Check
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
