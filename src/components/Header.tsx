import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isUK = location.pathname.startsWith("/uk") || location.pathname === "/";
  const isUSA = location.pathname.startsWith("/usa");

  return (
    <header className="bg-primary text-primary-foreground shadow-primary sticky top-0 z-50">
      {/* Top trust bar */}
      <div className="bg-accent text-foreground py-1 px-4 text-center text-xs font-medium">
        🏆 Trusted by 50,000+ homeowners · Based on official VOA &amp; IRS guidelines · Free to use
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-accent rounded-lg p-1.5">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="font-display font-bold text-lg leading-tight block">TaxBandCheck</span>
            <span className="text-primary-foreground/70 text-[10px] leading-none block">Save on your property taxes</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/uk">
            <Button
              variant="ghost"
              size="sm"
              className={`text-primary-foreground hover:bg-primary-foreground/10 flex items-center gap-1.5 ${isUK ? "bg-primary-foreground/15" : ""}`}
            >
              <span className="text-base" aria-hidden>🇬🇧</span>
              UK Council Tax
            </Button>
          </Link>
          <Link to="/usa">
            <Button
              variant="ghost"
              size="sm"
              className={`text-primary-foreground hover:bg-primary-foreground/10 flex items-center gap-1.5 ${isUSA ? "bg-primary-foreground/15" : ""}`}
            >
              <span className="text-base" aria-hidden>🇺🇸</span>
              USA Property Tax
            </Button>
          </Link>
          <Link to="/faq">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              FAQ
            </Button>
          </Link>
        </nav>

        {/* CTA */}
        <Link to="/uk" className="hidden md:block">
          <Button size="sm" className="bg-accent text-foreground hover:bg-accent/90 font-semibold shadow-md">
            Check My Band Free →
          </Button>
        </Link>

        {/* Mobile menu */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20 px-4 pb-4 pt-2 flex flex-col gap-2">
          <Link to="/uk" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
              🇬🇧 UK Council Tax Checker
            </Button>
          </Link>
          <Link to="/usa" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
              🇺🇸 USA Property Tax Guide
            </Button>
          </Link>
          <Link to="/faq" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
              FAQ &amp; How It Works
            </Button>
          </Link>
          <Link to="/uk" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-accent text-foreground hover:bg-accent/90 font-semibold mt-1">
              Check My Band Free →
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
