"use server";

import { cookies } from "next/headers";
import { setupSteps, type SetupStep } from "./setup-constants";

async function getCompletedSteps(): Promise<string[]> {
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get("completed_steps")?.value;
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function markStepComplete(step: string) {
  const completedSteps = await getCompletedSteps();
  
  if (!completedSteps.includes(step)) {
    completedSteps.push(step);
  }

  const cookieStore = await cookies();
  const value = JSON.stringify(completedSteps);

  // Set cookie with appropriate options
  cookieStore.set("completed_steps", value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return completedSteps;
}

export async function isStepComplete(step: string): Promise<boolean> {
  const completedSteps = await getCompletedSteps();
  return completedSteps.includes(step);
}

export async function clearSetupProgress(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("completed_steps");
}

export async function getNextStep(currentStep: SetupStep): Promise<SetupStep | null> {
  const currentIndex = setupSteps.findIndex(step => step.id === currentStep);
  if (currentIndex === -1 || currentIndex === setupSteps.length - 1) return null;
  return setupSteps[currentIndex + 1].id;
}

export async function getPreviousStep(currentStep: SetupStep): Promise<SetupStep | null> {
  const currentIndex = setupSteps.findIndex(step => step.id === currentStep);
  if (currentIndex <= 0) return null;
  return setupSteps[currentIndex - 1].id;
}

export async function isSetupComplete(): Promise<boolean> {
  const completedSteps = await getCompletedSteps();
  return setupSteps.every(step => completedSteps.includes(step.id));
}

export async function getFirstIncompleteStep(): Promise<SetupStep> {
  const completedSteps = await getCompletedSteps();
  const incompleteStep = setupSteps.find(step => !completedSteps.includes(step.id));
  return incompleteStep?.id || setupSteps[0].id;
}

export async function getAllCompletedSteps(): Promise<string[]> {
  return getCompletedSteps();
}
