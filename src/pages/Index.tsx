
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IndustrySection from "@/components/IndustrySection";
import SignupForm from "@/components/SignupForm";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scroll to section when clicking on links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL without a page refresh
          history.pushState(null, '', href);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <IndustrySection />
        <AboutSection />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
