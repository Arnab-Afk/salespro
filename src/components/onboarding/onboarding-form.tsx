"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

type Step = {
  title: string
  description: string
  component: React.ReactNode
}

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    companySize: "",
    goals: "",
    email: ""
  })

  const steps: Step[] = [
    {
      title: "Welcome",
      description: "First, what's your name?",
      component: (
        <div className="space-y-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      )
    },
    {
      title: "Role",
      description: "What best describes your role?",
      component: (
        <RadioGroup
          value={formData.role}
          onValueChange={(value: string) => setFormData({ ...formData, role: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="founder" id="founder" />
            <Label htmlFor="founder">Founder/CEO</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manager" id="manager" />
            <Label htmlFor="manager">Sales Manager</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rep" id="rep" />
            <Label htmlFor="rep">Sales Representative</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Company Size",
      description: "How large is your company?",
      component: (
        <RadioGroup
          value={formData.companySize}
          onValueChange={(value: string) => setFormData({ ...formData, companySize: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-10" id="1-10" />
            <Label htmlFor="1-10">1-10 employees</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="11-50" id="11-50" />
            <Label htmlFor="11-50">11-50 employees</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="51-200" id="51-200" />
            <Label htmlFor="51-200">51-200 employees</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="201+" id="201+" />
            <Label htmlFor="201+">201+ employees</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Goals",
      description: "What are your main goals with our platform?",
      component: (
        <div className="space-y-4">
          <Label htmlFor="goals">Your Goals</Label>
          <Textarea
            id="goals"
            placeholder="Tell us what you hope to achieve..."
            value={formData.goals}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
              setFormData({ ...formData, goals: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      )
    },
    {
      title: "Almost Done",
      description: "Finally, what's your work email?",
      component: (
        <div className="space-y-4">
          <Label htmlFor="email">Work Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      )
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Handle form submission
      console.log("Form submitted:", formData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <Progress value={progress} className="mb-8" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-slate-500">{steps[currentStep].description}</p>
              </div>
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
