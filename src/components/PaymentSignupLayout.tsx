import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PaymentGuidancePanel } from "./PaymentGuidancePanel";
import { PaymentSignupForm } from "./PaymentSignupForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface FormData {
  // Business Information
  businessName: string;
  businessType: string;
  businessDescription: string;
  merchantCategoryCode: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Business Address
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  
  // Business Details
  website: string;
  monthlyVolume: string;
  averageTransaction: string;
  paymentMethods: string[];
  
  // Banking Information
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  
  // Verification Documents
  businessLicense: string;
  taxId: string;
  ownershipDocuments: string[];
}

const initialFormData: FormData = {
  businessName: "",
  businessType: "",
  businessDescription: "",
  merchantCategoryCode: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  country: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  website: "",
  monthlyVolume: "",
  averageTransaction: "",
  paymentMethods: [],
  bankName: "",
  accountNumber: "",
  routingNumber: "",
  businessLicense: "",
  taxId: "",
  ownershipDocuments: [],
};

export const PaymentSignupLayout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useLocalStorage<FormData>("paymentpro-signup", initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form after successful submission
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row min-h-screen"
      >
        {/* Guidance Panel - Left side on desktop, top on mobile */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:w-1/3 lg:min-h-screen"
        >
          <PaymentGuidancePanel currentStep={currentStep} />
        </motion.div>

        {/* Form Panel - Right side on desktop, bottom on mobile */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 lg:w-2/3"
        >
          <PaymentSignupForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};