import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shield, FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import type { FormData } from "../PaymentSignupLayout";

interface VerificationStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const VerificationStep = ({ formData, updateFormData }: VerificationStepProps) => {
  const handleFileUpload = (field: keyof FormData) => {
    // Simulate file upload
    const fileName = `uploaded_document_${Date.now()}.pdf`;
    updateFormData({ [field]: fileName });
  };

  const isRequiredFieldComplete = (field: string) => {
    return field && field.length > 0;
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
          Verification & Review
        </h2>
        <p className="text-muted-foreground">
          Upload required documents and review your application before submission.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Required Documents</span>
            <Badge variant="secondary">Upload Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="businessLicense" className="flex items-center gap-2">
                Business License *
                {isRequiredFieldComplete(formData.businessLicense) ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning" />
                )}
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                {formData.businessLicense ? (
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 text-success mx-auto" />
                    <p className="text-sm font-medium">{formData.businessLicense}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileUpload('businessLicense')}
                    >
                      Replace File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Upload business license</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileUpload('businessLicense')}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="taxId" className="flex items-center gap-2">
                Tax ID (EIN/SSN) *
                {isRequiredFieldComplete(formData.taxId) ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning" />
                )}
              </Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => updateFormData({ taxId: e.target.value })}
                placeholder="Enter your Tax ID"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Ownership Documents (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              {formData.ownershipDocuments.length > 0 ? (
                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-primary mx-auto" />
                  <p className="text-sm font-medium">
                    {formData.ownershipDocuments.length} document(s) uploaded
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData({ ownershipDocuments: [...formData.ownershipDocuments, `doc_${Date.now()}.pdf`] })}
                  >
                    Add More
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Upload articles of incorporation, partnership agreements, etc.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData({ ownershipDocuments: [`doc_${Date.now()}.pdf`] })}
                  >
                    Choose Files
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Application Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Business Information</h4>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium">Name:</span> {formData.businessName || "Not provided"}</p>
                <p><span className="font-medium">Type:</span> {formData.businessType || "Not selected"}</p>
                <p><span className="font-medium">MCC:</span> {formData.merchantCategoryCode || "Not provided"}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium">Contact:</span> {formData.contactName || "Not provided"}</p>
                <p><span className="font-medium">Email:</span> {formData.contactEmail || "Not provided"}</p>
                <p><span className="font-medium">Location:</span> {formData.city && formData.country ? `${formData.city}, ${formData.country}` : "Not provided"}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Payment Setup</h4>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium">Volume:</span> {formData.monthlyVolume || "Not selected"}</p>
                <p><span className="font-medium">Methods:</span> {formData.paymentMethods.length} selected</p>
                <p><span className="font-medium">Bank:</span> {formData.bankName || "Not provided"}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Verification Status</h4>
              <div className="space-y-1 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Business License:</span>
                  {formData.businessLicense ? (
                    <Badge variant="outline" className="text-success border-success">Complete</Badge>
                  ) : (
                    <Badge variant="outline" className="text-warning border-warning">Pending</Badge>
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Tax ID:</span>
                  {formData.taxId ? (
                    <Badge variant="outline" className="text-success border-success">Complete</Badge>
                  ) : (
                    <Badge variant="outline" className="text-warning border-warning">Pending</Badge>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              What happens next?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your application will be reviewed within 1-2 business days</li>
              <li>• We may contact you for additional information or clarification</li>
              <li>• Once approved, you'll receive setup instructions and API credentials</li>
              <li>• Our support team will help you integrate PaymentPro into your system</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};