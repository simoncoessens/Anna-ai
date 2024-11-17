import { clsx, type ClassValue } from 'clsx'; // Organized import for clarity
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}