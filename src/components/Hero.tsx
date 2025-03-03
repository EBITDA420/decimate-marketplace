
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

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
            className="w-full h-full bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-emerald-600/30 animate-pulse-subtle rounded-full blur-3xl" 
            style={{ animationDuration: '8s' }}
          />
        </div>
      </div>
      
      {/* Hero content */}
      <div className="container max-w-5xl mx-auto text-center">
        <div className="space-y-3 mb-6">
          <span 
            className={`inline-block px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Challenging Industry Monopolies
          </span>
        </div>
        
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
        >
          <span className="block">Decimate the Giants.</span>
          <span className="block text-primary">Build the Future.</span>
        </h1>
        
        <p 
          className={`text-xl text-neutral-600 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
        >
          Join a community of supporters ready to back entrepreneurs challenging consolidated markets. When we reach 1 million supporters for an industry, we enable new businesses to launch with momentum.
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="#industries" 
            className="px-8 py-4 rounded-full bg-primary text-white font-medium text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all focus-ring w-full sm:w-auto"
          >
            Explore Industries
          </a>
          
          <a 
            href="#about" 
            className="px-8 py-4 rounded-full bg-white border border-neutral-200 text-neutral-800 font-medium text-lg hover:bg-neutral-50 transition-colors focus-ring w-full sm:w-auto"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <a 
          href="#industries" 
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-primary transition-colors"
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
