
import { useState, useEffect, useRef } from "react";
import { Briefcase, ShoppingCart, Share2, Building, Search, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  count: number;
  target: number;
}

const industries: Industry[] = [
  {
    id: "health-insurance",
    name: "Health Insurance",
    description: "Supporting innovative alternatives to traditional health insurance models.",
    icon: <Briefcase className="w-6 h-6" />,
    count: 345621,
    target: 1000000,
  },
  {
    id: "ecommerce",
    name: "eCommerce",
    description: "Backing new marketplace solutions that challenge major retail platforms.",
    icon: <ShoppingCart className="w-6 h-6" />,
    count: 567842,
    target: 1000000,
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Enabling fresh approaches to connecting people online.",
    icon: <Share2 className="w-6 h-6" />,
    count: 423156,
    target: 1000000,
  },
  {
    id: "cities",
    name: "Cities",
    description: "Reimagining urban development and city infrastructure solutions.",
    icon: <Building className="w-6 h-6" />,
    count: 189753,
    target: 1000000,
  },
  {
    id: "search-engines",
    name: "Search Engines",
    description: "Creating alternative discovery platforms for the web.",
    icon: <Search className="w-6 h-6" />,
    count: 287459,
    target: 1000000,
  },
  {
    id: "computer-hardware",
    name: "Computer Hardware",
    description: "Fostering innovation in computing devices and components.",
    icon: <Cpu className="w-6 h-6" />,
    count: 316482,
    target: 1000000,
  },
];

const IndustryCard = ({ industry, index }: { industry: Industry; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const progress = (industry.count / industry.target) * 100;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100); // Staggered animation
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass rounded-2xl overflow-hidden transition-all duration-500 transform",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8",
        "hover:shadow-lg hover:shadow-primary/5 hover:translate-y-[-2px] hover:border-primary/20"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
          {industry.icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
        <p className="text-neutral-600 mb-4">{industry.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{industry.count.toLocaleString()}</span>
            <span className="text-neutral-500">{industry.target.toLocaleString()}</span>
          </div>
          
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
              style={{ 
                width: isVisible ? `${progress}%` : '0%',
                transitionDelay: `${(index * 100) + 300}ms`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const IndustrySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="industries" 
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span 
            className={cn(
              "inline-block px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3 transition-all duration-500",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            Disruption Targets
          </span>
          
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 delay-100",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Our Hitlist
          </h2>
          
          <p 
            className={cn(
              "text-xl text-neutral-600 max-w-2xl mx-auto transition-all duration-500 delay-200",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            Our leaderboard of industries that need more competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard 
              key={industry.id} 
              industry={industry} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
