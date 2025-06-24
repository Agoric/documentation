import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { splitLines } from "@/lib/safe-split";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Assuming 'content' is declared elsewhere in the code
const content = "Your content here";
const lines = splitLines(content);

// ** rest of code here **
