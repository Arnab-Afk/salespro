"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FormData = {
  name: string;
  address: string;
  city: string;
  country: string;
  industry: string;
  size: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
};

const steps = ["Company Details", "Industry & Size", "Review"];

export function CompanySetupForm() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      industry: "",
      size: "1-10"
    }
  });

  const validateCurrentStep = () => {
    if (step === 0) {
      const fields = ["name", "address", "city", "country"];
      let isValid = true;
      let focusSet = false;

      fields.forEach(field => {
        const value = form.getValues(field as keyof FormData);
        if (value.length < 2 || (field === "address" && value.length < 5)) {
          form.setError(field as keyof FormData, {
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${field === "address" ? "5" : "2"} characters`
          });
          isValid = false;
          if (!focusSet) {
            form.setFocus(field as keyof FormData);
            focusSet = true;
          }
        } else {
          form.clearErrors(field as keyof FormData);
        }
      });

      return isValid;
    }

    if (step === 1) {
      const industry = form.getValues("industry");
      const size = form.getValues("size");
      let isValid = true;

      if (industry.length < 2) {
        form.setError("industry", { message: "Industry must be at least 2 characters" });
        form.setFocus("industry");
        isValid = false;
      } else {
        form.clearErrors("industry");
      }

      if (!["1-10", "11-50", "51-200", "201-500", "500+"].includes(size)) {
        form.setError("size", { message: "Please select a company size" });
        if (isValid) form.setFocus("size");
        isValid = false;
      } else {
        form.clearErrors("size");
      }

      return isValid;
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    if (step < steps.length - 1) {
      const isValid = validateCurrentStep();
      if (isValid) {
        setStep(step + 1);
      }
      return;
    }

    try {
      setIsLoading(true);
      await router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your industry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1-10" />
                        </FormControl>
                        <FormLabel className="font-normal">1-10</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="11-50" />
                        </FormControl>
                        <FormLabel className="font-normal">11-50</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="51-200" />
                        </FormControl>
                        <FormLabel className="font-normal">51-200</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="201-500" />
                        </FormControl>
                        <FormLabel className="font-normal">201-500</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="500+" />
                        </FormControl>
                        <FormLabel className="font-normal">500+</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Review Your Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Company Name:</span>
                  <span>{form.getValues("name")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Address:</span>
                  <span>{form.getValues("address")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">City:</span>
                  <span>{form.getValues("city")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Country:</span>
                  <span>{form.getValues("country")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Industry:</span>
                  <span>{form.getValues("industry")}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Company Size:</span>
                  <span>{form.getValues("size")}</span>
                </div>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {steps.map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 ${
                      index < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-1">{steps[step]}</h2>
          <p className="text-muted-foreground">
            {step === 0
              ? "Enter your company's basic information"
              : step === 1
              ? "Tell us more about your business"
              : "Review and confirm your information"}
          </p>
        </div>
        {renderStep()}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {step === steps.length - 1 ? "Complete Setup" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
