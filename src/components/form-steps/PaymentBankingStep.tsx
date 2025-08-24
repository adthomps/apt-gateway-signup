import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Building, DollarSign, Sparkles } from "lucide-react";
import type { FormData } from "../PaymentSignupLayout";

interface PaymentBankingStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const volumeRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000 - $500,000",
  "$500,000+"
];

const paymentMethodOptions = [
  { id: "visa", label: "Visa", popular: true },
  { id: "mastercard", label: "MasterCard", popular: true },
  { id: "amex", label: "American Express", popular: true },
  { id: "discover", label: "Discover", popular: false },
  { id: "paypal", label: "PayPal", popular: true },
  { id: "apple-pay", label: "Apple Pay", popular: true },
  { id: "google-pay", label: "Google Pay", popular: true },
  { id: "bank-transfer", label: "Bank Transfer/ACH", popular: false },
  { id: "crypto", label: "Cryptocurrency", popular: false }
];

export const PaymentBankingStep = ({ formData, updateFormData }: PaymentBankingStepProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handlePaymentMethodChange = (methodId: string, checked: boolean) => {
    let updatedMethods = [...formData.paymentMethods];
    
    if (checked) {
      updatedMethods.push(methodId);
    } else {
      updatedMethods = updatedMethods.filter(method => method !== methodId);
    }
    
    updateFormData({ paymentMethods: updatedMethods });
  };

  const suggestPaymentMethods = () => {
    // Suggest popular payment methods based on business type
    const popularMethods = paymentMethodOptions
      .filter(method => method.popular)
      .map(method => method.id);
    
    updateFormData({ paymentMethods: popularMethods });
    setShowSuggestions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Payment & Banking Setup
        </h2>
        <p className="text-muted-foreground">
          Configure your payment processing and banking information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>Transaction Information</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyVolume">Expected Monthly Volume *</Label>
              <Select
                value={formData.monthlyVolume}
                onValueChange={(value) => updateFormData({ monthlyVolume: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  {volumeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="averageTransaction">Average Transaction Amount</Label>
              <Input
                id="averageTransaction"
                value={formData.averageTransaction}
                onChange={(e) => updateFormData({ averageTransaction: e.target.value })}
                placeholder="e.g., $25.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Business Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => updateFormData({ website: e.target.value })}
              placeholder="https://www.yourwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Methods</span>
              <Badge variant="secondary">Required</Badge>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={suggestPaymentMethods}
              className="flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Suggest Popular
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Select the payment methods you want to accept *
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {paymentMethodOptions.map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  id={method.id}
                  checked={formData.paymentMethods.includes(method.id)}
                  onCheckedChange={(checked) => handlePaymentMethodChange(method.id, checked as boolean)}
                />
                <Label
                  htmlFor={method.id}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <span>{method.label}</span>
                  {method.popular && (
                    <Badge variant="outline" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            <span>Banking Information</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name *</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => updateFormData({ bankName: e.target.value })}
              placeholder="Enter your bank name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                placeholder="Enter account number"
                type="password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                onChange={(e) => updateFormData({ routingNumber: e.target.value })}
                placeholder="Enter routing number"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};