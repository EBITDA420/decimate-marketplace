
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all duration-300",
        scrolled 
          ? "bg-roman-ivory/80 backdrop-blur-md border-b border-roman-gold/30 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          decimate
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#industries" className="text-sm font-medium text-foreground hover:text-roman-red transition-colors">
            Industries
          </a>
          <a href="#about" className="text-sm font-medium text-foreground hover:text-roman-red transition-colors">
            About
          </a>
          <Link to="/industry-signup" className="text-sm font-medium text-foreground hover:text-roman-red transition-colors">
            Join
          </Link>
        </nav>
        
        <Link 
          to="/industry-signup" 
          className="px-5 py-2 rounded-full bg-roman-red text-roman-ivory text-sm font-medium hover:bg-roman-red/90 transition-colors focus-ring"
        >
          Decimate an Industry
        </Link>
      </div>
    </header>
  );
};

export default Header;
