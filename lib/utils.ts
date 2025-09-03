import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge a variable number of class name values into a single Tailwind-safe string.
 * Uses clsx for conditional class assembling and tailwind-merge to resolve conflicts.
 */
export function cn(...classValues: ClassValue[]): string {
  return twMerge(clsx(classValues));
}

