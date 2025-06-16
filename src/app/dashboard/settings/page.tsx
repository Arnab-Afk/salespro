"use client"

import { useTenant } from "@/context/tenant-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function SettingsPage() {
  const { currentTenant, updateTenant } = useTenant()
  const [formData, setFormData] = useState({
    name: currentTenant?.name ?? "",
    plan: currentTenant?.plan ?? "starter"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentTenant) {
      updateTenant(currentTenant.id, formData)
    }
  }

  if (!currentTenant) return null

  return (
    <div className="container max-w-4xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Tenant Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your tenant settings and preferences.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure your tenant's basic information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value: "starter" | "professional" | "enterprise") => 
      setFormData({ ...formData, plan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>
              View important information about your tenant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Tenant ID</span>
              <span className="text-muted-foreground">{currentTenant.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Created At</span>
              <span className="text-muted-foreground">
                {new Date(currentTenant.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Tenant Slug</span>
              <span className="text-muted-foreground">{currentTenant.slug}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
