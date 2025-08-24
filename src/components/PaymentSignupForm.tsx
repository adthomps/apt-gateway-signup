import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { BusinessInfoStep } from "./form-steps/BusinessInfoStep";
import { ContactAddressStep } from "./form-steps/ContactAddressStep";
import { PaymentBankingStep } from "./form-steps/PaymentBankingStep";
import { VerificationStep } from "./form-steps/VerificationStep";
import type { FormData } from "./PaymentSignupLayout";

interface PaymentSignupFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const PaymentSignupForm = ({
  currentStep,
  setCurrentStep,
  formData,
  updateFormData,
  onSubmit,
  isSubmitting
}: PaymentSignupFormProps) => {
  const totalSteps = 4;
  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType && formData.merchantCategoryCode;
      case 2:
        return formData.contactName && formData.contactEmail && formData.country && formData.address;
      case 3:
        return formData.monthlyVolume && formData.paymentMethods.length > 0 && formData.bankName;
      case 4:
        return formData.businessLicense && formData.taxId;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <ContactAddressStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <PaymentBankingStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <VerificationStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-card">
      {/* Progress Bar */}
      <div className="border-b border-border bg-secondary/30 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-2xl mx-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canGoNext() || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : currentStep === totalSteps ? (
              "Submit Application"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};