import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2) {
    return address;
  }
  const prefix = address.slice(0, chars);
  const suffix = address.slice(-chars);
  return `${prefix}...${suffix}`;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format each component to ensure they are 2 digits if necessary
  const monthString = month.toString();
  const dayString = day.toString();
  const yearString = year.toString();

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return `${monthString}/${dayString}/${yearString} ${hoursString}:${minutesString}:${secondsString}`;
}