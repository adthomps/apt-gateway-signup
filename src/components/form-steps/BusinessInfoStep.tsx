import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles } from "lucide-react";
import type { FormData } from "../PaymentSignupLayout";

interface BusinessInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const businessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "Non-Profit",
  "Government"
];

const suggestedMCCs = [
  { code: "5411", category: "Grocery Stores, Supermarkets" },
  { code: "5812", category: "Eating Places, Restaurants" },
  { code: "5969", category: "Direct Marketing - Other" },
  { code: "5999", category: "Miscellaneous Retail Stores" },
  { code: "7372", category: "Computer Programming, Data Processing" },
  { code: "8299", category: "Educational Services" }
];

export const BusinessInfoStep = ({ formData, updateFormData }: BusinessInfoStepProps) => {
  const [showMCCSuggestions, setShowMCCSuggestions] = useState(false);

  const handleMCCSelect = (code: string, category: string) => {
    updateFormData({ merchantCategoryCode: `${code} - ${category}` });
    setShowMCCSuggestions(false);
  };

  const generateBusinessDescription = () => {
    if (formData.businessName && formData.businessType) {
      const suggestions = [
        `${formData.businessName} is a ${formData.businessType.toLowerCase()} that specializes in providing high-quality products and services to our customers.`,
        `As a ${formData.businessType.toLowerCase()}, ${formData.businessName} focuses on delivering exceptional customer experiences through innovative solutions.`,
        `${formData.businessName} operates as a ${formData.businessType.toLowerCase()}, committed to excellence and customer satisfaction in our industry.`
      ];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      updateFormData({ businessDescription: randomSuggestion });
    }
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
          Tell us about your business
        </h2>
        <p className="text-muted-foreground">
          We need some basic information to set up your payment processing account.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Business Information</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData({ businessName: e.target.value })}
                placeholder="Enter your business name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => updateFormData({ businessType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateBusinessDescription}
                className="flex items-center gap-1"
                disabled={!formData.businessName || !formData.businessType}
              >
                <Sparkles className="w-3 h-3" />
                AI Suggest
              </Button>
            </div>
            <Textarea
              id="businessDescription"
              value={formData.businessDescription}
              onChange={(e) => updateFormData({ businessDescription: e.target.value })}
              placeholder="Describe what your business does..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="merchantCategoryCode">Merchant Category Code (MCC) *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMCCSuggestions(!showMCCSuggestions)}
                className="flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                Suggestions
              </Button>
            </div>
            <Input
              id="merchantCategoryCode"
              value={formData.merchantCategoryCode}
              onChange={(e) => updateFormData({ merchantCategoryCode: e.target.value })}
              placeholder="e.g., 5999 - Miscellaneous Retail Stores"
            />
            
            {showMCCSuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3"
              >
                {suggestedMCCs.map((mcc) => (
                  <Button
                    key={mcc.code}
                    variant="outline"
                    size="sm"
                    onClick={() => handleMCCSelect(mcc.code, mcc.category)}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-semibold text-xs">{mcc.code}</div>
                      <div className="text-xs text-muted-foreground">{mcc.category}</div>
                    </div>
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};