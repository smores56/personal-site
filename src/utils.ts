import { writable } from "svelte/store";

export const darkMode = writable(false);

export function formatDate(date: string | Date): string {
  let localDate;
  if (typeof date === "string") {
    const utcDate = new Date(date);
    localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  } else {
    localDate = date;
  }

  return localDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
}
