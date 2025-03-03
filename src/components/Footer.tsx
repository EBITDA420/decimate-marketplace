
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-neutral-50 border-t border-neutral-200">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
              decimate
            </a>
            <p className="text-neutral-600 max-w-md mt-2">
              Empowering entrepreneurs to challenge industry monopolies through collective consumer support.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#industries" className="text-neutral-600 hover:text-primary transition-colors">
                  Industries
                </a>
              </li>
              <li>
                <a href="#about" className="text-neutral-600 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#signup" className="text-neutral-600 hover:text-primary transition-colors">
                  Join Now
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-center pt-10 mt-10 border-t border-neutral-200",
          "text-neutral-500 text-sm"
        )}>
          <p>© {currentYear} Decimate. All rights reserved.</p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
