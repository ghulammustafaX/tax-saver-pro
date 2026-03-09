import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isUK = location.pathname.startsWith("/uk") || location.pathname === "/";
  const isUSA = location.pathname.startsWith("/usa");
  const isFAQ = location.pathname.startsWith("/faq");

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-0 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">T</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            TaxBandCheck
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/uk"
            className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
              isUK
                ? "bg-primary-subtle text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            🇬🇧 UK Council Tax
          </Link>
          <Link
            to="/usa"
            className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
              isUSA
                ? "bg-primary-subtle text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            🇺🇸 USA Property Tax
          </Link>
          <Link
            to="/faq"
            className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
              isFAQ
                ? "bg-primary-subtle text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            FAQ
          </Link>
        </nav>

        {/* CTA */}
        <Link
          to="/uk"
          className="hidden md:inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Check My Band Free →
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-5 pt-3 flex flex-col gap-1">
          <Link
            to="/uk"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
          >
            🇬🇧 UK Council Tax Checker
          </Link>
          <Link
            to="/usa"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
          >
            🇺🇸 USA Property Tax Guide
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
          >
            FAQ &amp; How It Works
          </Link>
          <Link
            to="/uk"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Check My Band Free →
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
