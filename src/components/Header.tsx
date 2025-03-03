
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          decimate
        </a>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#industries" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
            Industries
          </a>
          <a href="#about" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
            About
          </a>
          <a href="#signup" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
            Join
          </a>
        </nav>
        
        <a 
          href="#signup" 
          className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors focus-ring"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
