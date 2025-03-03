
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-roman-ivory px-6">
      <div className="text-center max-w-md">
        <div className="bg-roman-gold/10 w-16 h-16 rounded-full flex items-center justify-center text-roman-gold mb-6 mx-auto">
          <span className="text-2xl font-bold">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        
        <p className="text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-roman-red text-roman-ivory font-medium hover:bg-roman-red/90 transition-colors focus-ring"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
