
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/components/IndustrySection";

type SignupStep = "select" | "contact" | "verify" | "complete";

const IndustrySignup = () => {
  const navigate = useNavigate();
  const { industryId } = useParams();
  const [selectedIndustry, setSelectedIndustry] = useState(
    industryId ? industries.find(i => i.id === industryId) : null
  );
  const [currentStep, setCurrentStep] = useState<SignupStep>(industryId ? "contact" : "select");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleIndustrySelect = (industry: typeof industries[0]) => {
    setSelectedIndustry(industry);
    setCurrentStep("contact");
    // Update URL without refreshing the page
    navigate(`/industry-signup/${industry.id}`, { replace: true });
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep("verify");
      toast.success("Verification code sent! Please check your email and phone.");
    }, 1000);
  };
  
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep("complete");
      toast.success("Verification successful!");
    }, 1000);
  };
  
  const handleShareLink = () => {
    if (!selectedIndustry) return;
    
    navigator.clipboard.writeText(`${window.location.origin}/industry-signup/${selectedIndustry.id}`);
    toast.success("Link copied to clipboard!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          {/* Progress steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "select" ? "bg-roman-red text-white" : "bg-roman-red text-white"}`}>
                {currentStep === "select" ? "1" : <Check className="w-5 h-5" />}
              </div>
              <div className="h-1 w-10 bg-gray-200">
                <div className={`h-full bg-roman-red ${currentStep !== "select" ? "w-full" : "w-0"} transition-all duration-300`}></div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "contact" ? "bg-roman-red text-white" : currentStep === "select" ? "bg-gray-200 text-gray-500" : "bg-roman-red text-white"}`}>
                {currentStep === "contact" ? "2" : currentStep === "select" ? "2" : <Check className="w-5 h-5" />}
              </div>
              <div className="h-1 w-10 bg-gray-200">
                <div className={`h-full bg-roman-red ${currentStep === "verify" || currentStep === "complete" ? "w-full" : "w-0"} transition-all duration-300`}></div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "verify" ? "bg-roman-red text-white" : currentStep === "select" || currentStep === "contact" ? "bg-gray-200 text-gray-500" : "bg-roman-red text-white"}`}>
                {currentStep === "verify" ? "3" : currentStep === "complete" ? <Check className="w-5 h-5" /> : "3"}
              </div>
              <div className="h-1 w-10 bg-gray-200">
                <div className={`h-full bg-roman-red ${currentStep === "complete" ? "w-full" : "w-0"} transition-all duration-300`}></div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "complete" ? "bg-roman-red text-white" : "bg-gray-200 text-gray-500"}`}>
                4
              </div>
            </div>
          </div>
          
          {/* Step 1: Select Industry */}
          {currentStep === "select" && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Select an Industry to Decimate</h1>
                <p className="text-xl text-neutral-600">Choose the industry you believe needs more competition</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustrySelect(industry)}
                    className="glass rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:shadow-primary/5 hover:translate-y-[-2px] hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
                    <p className="text-neutral-600 mb-2">{industry.description}</p>
                    <div className="text-sm text-neutral-500">
                      {industry.count.toLocaleString()} supporters
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Contact Information */}
          {currentStep === "contact" && selectedIndustry && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Join the Movement</h1>
                <p className="text-xl text-neutral-600 mb-2">
                  You've selected <span className="font-medium text-roman-red">{selectedIndustry.name}</span>
                </p>
                <p className="text-neutral-600">
                  Leave your contact information to verify your support
                </p>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCurrentStep("select");
                      navigate("/industry-signup", { replace: true });
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button type="submit" disabled={isSubmitting} className="bg-roman-red hover:bg-roman-red/90">
                    {isSubmitting ? "Sending..." : "Send Verification"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Verification */}
          {currentStep === "verify" && selectedIndustry && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Verify Your Contact</h1>
                <p className="text-xl text-neutral-600">
                  We've sent a verification code to your email and phone
                </p>
              </div>
              
              <form onSubmit={handleVerifySubmit} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium">
                    Verification Code
                  </label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center text-lg tracking-widest"
                    placeholder="Enter your code"
                    maxLength={6}
                    required
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("contact")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button type="submit" disabled={isSubmitting} className="bg-roman-red hover:bg-roman-red/90">
                    {isSubmitting ? "Verifying..." : "Verify"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 4: Completion */}
          {currentStep === "complete" && selectedIndustry && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">You're In!</h1>
                <p className="text-xl text-neutral-600 mb-4">
                  Thank you for joining the movement to decimate the {selectedIndustry.name} industry
                </p>
                <div className="text-neutral-600 inline-block bg-green-50 px-4 py-2 rounded-lg">
                  <span className="font-medium">Current supporters:</span>{" "}
                  {(selectedIndustry.count + 1).toLocaleString()}
                </div>
              </div>
              
              <div className="max-w-md mx-auto space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Share with Friends</h3>
                  <p className="text-neutral-600 mb-4">
                    Help us grow the movement by sharing this with others
                  </p>
                  <Button 
                    onClick={handleShareLink}
                    className="w-full bg-roman-red hover:bg-roman-red/90"
                  >
                    Copy Invite Link
                  </Button>
                </div>
                
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IndustrySignup;
