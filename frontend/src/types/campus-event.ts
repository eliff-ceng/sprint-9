export const EVENT_CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"] as const;
export type Category = (typeof EVENT_CATEGORIES)[number];

export type CampusEvent = {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  image?: string;
};

export type EventFormData = {
  [K in Exclude<keyof CampusEvent, "id" | "image" | "capacity">]:
    K extends "category" ? Category | "" : string;
} & { capacity: string };

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
