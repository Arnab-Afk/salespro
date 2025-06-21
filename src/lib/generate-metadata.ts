import { metadata } from "./metadata";
import type { Metadata } from "next";

type DeepKeyof<T> = T extends object ? {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? `${K}.${DeepKeyof<T[K]>}`
      : K
    : never
}[keyof T] : never;

type MetadataPath = DeepKeyof<typeof metadata.pages>;

export function generateMetadata(path: MetadataPath | keyof typeof metadata.pages): Metadata {
  const parts = path.toString().split('.');
  let current: any = metadata.pages;
  
  for (const part of parts) {
    current = current[part];
  }

  return {
    title: current.title,
    description: current.description,
  };
}
