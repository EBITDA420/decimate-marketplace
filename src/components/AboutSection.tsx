
import { useRef, useState, useEffect } from "react";
import { Users, Target, Gavel, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const Feature = ({ icon, title, description, index, isVisible }: FeatureProps) => (
  <div 
    className={cn(
      "transition-all duration-700 transform",
      isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-8"
    )}
    style={{ transitionDelay: `${100 + (index * 100)}ms` }}
  >
    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const AboutSection = () => {
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

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Power in Numbers",
      description: "We gather supporters who want to see meaningful change in stagnant industries dominated by a few major players."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Million-Strong Goal",
      description: "Once we reach 1,000,000 supporters for an industry, we create real momentum for entrepreneurs to challenge the status quo."
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Entrepreneur Access",
      description: "We auction industry access to qualified entrepreneurs with innovative ideas, connecting them with their first million potential customers."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-6"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div 
              className={cn(
                "space-y-6 transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              )}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Our Mission
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Disrupting Industry Monopolies Through Collective Action
              </h2>
              
              <p className="text-lg text-neutral-600">
                Decimate unites millions of individuals who are ready to support alternatives to established industry giants. We create opportunities for innovative entrepreneurs to challenge consolidated markets.
              </p>
              
              <div>
                <a 
                  href="#signup" 
                  className="inline-flex items-center text-primary font-medium hover:underline group"
                >
                  Join the movement
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <Feature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
