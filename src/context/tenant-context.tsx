"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Tenant {
  id: string
  name: string
  slug: string
  plan: "starter" | "professional" | "enterprise"
  createdAt: string
}

interface TenantContextType {
  currentTenant: Tenant | null
  tenants: Tenant[]
  setCurrentTenant: (tenant: Tenant) => void
  addTenant: (tenant: Tenant) => void
  updateTenant: (id: string, updates: Partial<Tenant>) => void
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])

  // Load tenants from localStorage on mount
  useEffect(() => {
    const savedTenants = localStorage.getItem("tenants")
    const savedCurrentTenant = localStorage.getItem("currentTenant")
    
    if (savedTenants) {
      setTenants(JSON.parse(savedTenants))
    }
    
    if (savedCurrentTenant) {
      setCurrentTenant(JSON.parse(savedCurrentTenant))
    }
  }, [])

  // Save to localStorage when tenants change
  useEffect(() => {
    if (tenants.length > 0) {
      localStorage.setItem("tenants", JSON.stringify(tenants))
    }
  }, [tenants])

  // Save current tenant to localStorage
  useEffect(() => {
    if (currentTenant) {
      localStorage.setItem("currentTenant", JSON.stringify(currentTenant))
    }
  }, [currentTenant])

  const addTenant = (tenant: Tenant) => {
    setTenants((prev) => [...prev, tenant])
    if (!currentTenant) {
      setCurrentTenant(tenant)
    }
  }

  const updateTenant = (id: string, updates: Partial<Tenant>) => {
    setTenants((prev) => 
      prev.map((tenant) => 
        tenant.id === id ? { ...tenant, ...updates } : tenant
      )
    )

    if (currentTenant?.id === id) {
      setCurrentTenant((prev) => prev ? { ...prev, ...updates } : prev)
    }
  }

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        tenants,
        setCurrentTenant,
        addTenant,
        updateTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return context
}
