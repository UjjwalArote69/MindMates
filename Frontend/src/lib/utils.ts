import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getToken = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage) return tokenFromLocalStorage;

  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  if (match) return match[2];

  return null;
};
