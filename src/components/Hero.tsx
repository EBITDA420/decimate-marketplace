
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10%] opacity-20">
          <div 
            className="w-full h-full bg-gradient-to-r from-roman-red/30 via-roman-gold/30 to-roman-ivory/40 animate-pulse-subtle rounded-full blur-3xl" 
            style={{ animationDuration: '8s' }}
          />
        </div>
      </div>
      
      {/* Hero content */}
      <div className="container max-w-5xl mx-auto text-center">
        <div className="space-y-3 mb-6">
          <span 
            className={`inline-block px-4 py-1.5 text-xs font-medium bg-roman-gold/10 text-roman-gold rounded-full transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Igniting the largest redistribution of wealth in human history
          </span>
        </div>
        
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
        >
          <span className="block">Decimate the Giants.</span>
          <span className="block text-roman-red">Build the Future.</span>
        </h1>
        
        <p 
          className={`text-xl text-neutral-600 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
        >
          Reallocating $100 billion into the hands of consumers
        </p>
        
        <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <Link 
            to="/industry-signup" 
            className="px-8 py-4 rounded-full bg-roman-red text-roman-ivory font-medium text-lg shadow-lg shadow-roman-red/20 hover:shadow-xl hover:shadow-roman-red/30 hover:translate-y-[-2px] transition-all focus-ring"
          >
            Decimate an Industry
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <a 
          href="#industries" 
          className="flex flex-col items-center justify-center text-roman-gold hover:text-roman-red transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
