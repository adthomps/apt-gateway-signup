import { motion } from "framer-motion";
import { CheckCircle, Circle, Building2, UserCheck, CreditCard, Shield, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GuidancePanelProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: "Business Information",
    description: "Tell us about your business and what you do",
    icon: Building2,
    estimatedTime: "2-3 minutes",
    requirements: [
      "Business name and type",
      "Business description",
      "Merchant category code"
    ]
  },
  {
    id: 2,
    title: "Contact & Address",
    description: "Your contact details and business location",
    icon: UserCheck,
    estimatedTime: "1-2 minutes",
    requirements: [
      "Primary contact information",
      "Complete business address",
      "Phone number verification"
    ]
  },
  {
    id: 3,
    title: "Payment & Banking",
    description: "Set up your payment processing preferences",
    icon: CreditCard,
    estimatedTime: "3-4 minutes",
    requirements: [
      "Monthly transaction volume",
      "Preferred payment methods",
      "Banking information"
    ]
  },
  {
    id: 4,
    title: "Verification & Review",
    description: "Upload documents and review your application",
    icon: Shield,
    estimatedTime: "2-3 minutes",
    requirements: [
      "Business license",
      "Tax identification",
      "Ownership documents"
    ]
  }
];

export const PaymentGuidancePanel = ({ currentStep }: GuidancePanelProps) => {
  return (
    <div className="gradient-primary h-full p-6 lg:p-8 text-primary-foreground">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          PaymentPro Signup
        </h1>
        <p className="text-primary-light-foreground/80 text-sm lg:text-base">
          Join thousands of merchants who trust PaymentPro for secure, fast payments
        </p>
      </motion.div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const IconComponent = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`border-0 transition-all duration-300 ${
                isActive 
                  ? "bg-primary-foreground/20 ring-2 ring-primary-foreground/30" 
                  : isCompleted 
                    ? "bg-primary-foreground/10" 
                    : "bg-primary-foreground/5"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : isActive ? (
                        <Circle className="w-5 h-5 text-primary-foreground fill-current" />
                      ) : (
                        <Circle className="w-5 h-5 text-primary-foreground/40" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4" />
                        <h3 className="font-semibold text-sm text-primary-foreground">
                          {step.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          {step.estimatedTime}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-primary-foreground/70 mb-2">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-1">
                        {step.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center gap-2 text-xs text-primary-foreground/60">
                            <div className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-4 bg-primary-foreground/10 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <FileCheck className="w-4 h-4" />
          <span className="font-semibold text-sm">Progress Saved</span>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Your application is automatically saved. You can return anytime to complete it.
        </p>
      </motion.div>
    </div>
  );
};