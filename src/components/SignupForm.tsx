
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Industry options for the dropdown
const industries = [
  { id: "health-insurance", name: "Health Insurance" },
  { id: "ecommerce", name: "eCommerce" },
  { id: "social-media", name: "Social Media" },
  { id: "cities", name: "Cities" },
  { id: "search-engines", name: "Search Engines" },
  { id: "computer-hardware", name: "Computer Hardware" },
];

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !selectedIndustry) return;
    
    // In a real app, you would submit to a server here
    console.log("Form submitted:", { email, industry: selectedIndustry });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("");
      setSelectedIndustry("");
      setSubmitted(false);
    }, 3000);
  };
  
  const selectedIndustryName = industries.find(i => i.id === selectedIndustry)?.name || "Select an industry";

  return (
    <section id="signup" className="py-20 px-6 bg-neutral-50">
      <div 
        ref={formRef}
        className={cn(
          "container max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100" : "opacity-0 translate-y-8"
        )}
      >
        <div className="glass rounded-3xl overflow-hidden shadow-xl shadow-primary/5">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Join the Movement
              </span>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Support Industry Disruption
              </h2>
              
              <p className="text-neutral-600">
                Sign up to back entrepreneurs ready to challenge consolidated industries. Your support sends a powerful signal.
              </p>
            </div>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-green-100 text-green-800 rounded-full p-3 mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Thank you for joining!</h3>
                <p className="text-neutral-600 text-center">
                  Your support matters. We'll keep you updated on progress in your selected industry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="relative" ref={dropdownRef}>
                    <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-1">
                      Industry to support
                    </label>
                    <button
                      type="button"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-left flex items-center justify-between"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={selectedIndustry ? "" : "text-neutral-400"}>
                        {selectedIndustryName}
                      </span>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-xl border border-neutral-100 shadow-lg py-1 animate-scale-in">
                        {industries.map((industry) => (
                          <button
                            key={industry.id}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-neutral-50 transition-colors"
                            onClick={() => {
                              setSelectedIndustry(industry.id);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {industry.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-primary text-white font-medium text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all focus-ring"
                >
                  Support This Industry
                </button>
                
                <p className="text-xs text-neutral-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy. We'll never share your information with third parties without your permission.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
